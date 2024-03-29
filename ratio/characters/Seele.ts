import { MatrixOfPrescienceEffect } from "../effects/buffs/MatrixOfPrescienceEffect";
import { Action, ActionType } from "../system/Action";
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

export class Seele extends Character {
    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = []
    ) {
        const stats = new Stats(
            {
                health: 931,
                defense: 364,
                attack: 640,
                speed: 115,
                maxEnergy: 120,
            },
            true,
            substats
        );
        // sub traces
        stats.critDamage += 0.24;
        stats.percentAttack += 0.28;
        stats.percentDefense += 0.125;

        super("Seele", stats, Element.Quantum);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
    }

    act(game: Game): void {
        this.turns++;

        this.basic(game);

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }
    }

    basic(game: Game) {
        let buffedStats = this.preAttackStats(game);

        let target = game.getRandomEnemy();

        // lvl 5
        let attack = new Attack(
            this.element,
            buffedStats,
            (atk) => {
                return atk * 1;
            },
            [AttackType.Basic],
            target
        );

        // lvl 6 attack
        // let attack = new Attack(
        //     buffedStats,
        //     (atk) => {
        //         return atk * 1;
        //     },
        //     [AttackType.Skill],
        //     target
        // );

        attack = this.preAttackModifiers(game, attack);

        target.modifyAttack(game, attack);

        let damage = attack.calcDamage();

        game.actions.push(new Action(game, this, ActionType.Basic, attack));
        this.totalDamage += damage;
        this.regenerateEnergy(20);
    }

    skill(game: Game) {
        this.regenerateEnergy(30);
    }

    ult(game?: Game) {
        this.currentEnergy = 0;
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

    printTotalDamage() {
        console.log(
            `total damage by seele: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
