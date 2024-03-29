import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { type Rolls, Stats } from "../system/Stats";
import { Attack, AttackType } from "../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../system/attacks/AttackModifier";
import { EffectAttribute } from "../system/effects/Effect";

export class Ratio extends Character {
    // When Dr. Ratio uses his Skill, for every debuff on the target,
    // his CRIT Rate increases by 2.5% and CRIT DMG by 5%. This effect can stack up to 6 time(s).
    summationStacks = 3;

    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = []
    ) {
        const stats = new Stats(
            {
                health: 1048,
                defense: 461,
                attack: 776,
                speed: 103,
                maxEnergy: 140,
            },
            true,
            substats
        );
        // sub traces
        stats.critRate += 0.12;
        stats.percentAttack += 0.28;
        stats.percentDefense += 0.125;

        super("Dr. Ratio", stats, Element.Imaginary);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
    }

    act(game: Game): void {
        this.turns++;

        this.skill(game);

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }
    }

    skill(game: Game) {
        let buffedStats = this.preAttackStats(game);

        buffedStats.critRate += this.summationStacks * 0.025;
        buffedStats.critDamage += this.summationStacks * 0.05;

        let target = game.getRandomEnemy();

        let attack = new Attack(
            this.element,
            buffedStats,
            (atk) => {
                return atk * 1.5;
            },
            [AttackType.Skill],
            target
        );

        attack.addModifier(
            new AttackModifier(AttackModifierType.DamageBoost, 0.1 * 3) // a2 trace: 10% damage increase per debuff on target
        );

        attack = this.preAttackModifiers(game, attack);

        target.modifyAttack(game, attack);

        let damage = attack.calcDamage();

        this.totalDamage += damage;
        this.regenerateEnergy(20);
        this.followUp(game);
    }

    ult(game: Game) {
        let buffedStats = this.preAttackStats(game);

        let enemy = game.enemies[0];
        enemy.wisemanFolly = 2;
        let attack = new Attack(
            this.element,
            buffedStats,
            (atk) => {
                return atk * 2.4;
            },
            [AttackType.Ultimate],
            enemy
        );

        attack = this.preAttackModifiers(game, attack);

        enemy.modifyAttack(game, attack);

        let damage = attack.calcDamage();

        this.totalDamage += damage;
        this.currentEnergy = 0;
        this.regenerateEnergy(5);
    }

    followUp(game: Game) {
        let buffedStats = this.preAttackStats(game);

        let target = game.getRandomEnemy();

        let attack = new Attack(
            this.element,
            buffedStats,
            (atk) => {
                return atk * 2.7;
            },
            [AttackType.Skill],
            target
        );

        attack = this.preAttackModifiers(game, attack);

        target.modifyAttack(game, attack);

        let damage = attack.calcDamage();

        this.totalDamage += damage;
        this.regenerateEnergy(5);
    }

    preAttackModifiers(game: Game, attack: Attack): Attack {
        for (const set of this.relicSets) {
            attack = set.modifyAttack(attack);
        }

        attack = this.lightCone.modifyAttack(game, this, attack);

        for (const effect of this.effects) {
            if (effect.attributes.includes(EffectAttribute.AttackModifier)) {
                attack = effect.modifyAttack(attack);
            }
        }

        attack.addModifier(
            new AttackModifier(
                AttackModifierType.DamageBoost,
                this.stats[`${this.element}DamageBoost`],
                "stat damage boost"
            )
        );

        return attack;
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    /*
        pretty sure summation isn't an effect but just in case
    */
    // addSummationStacks() {
    //     this.summationStacks = Math.min(6, this.summationStacks + 3);
    // }

    printTotalDamage() {
        console.log(
            `total damage by ratio: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
