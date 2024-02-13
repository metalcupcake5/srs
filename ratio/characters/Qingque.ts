import { MatrixOfPrescienceEffect } from "../effects/buffs/MatrixOfPrescienceEffect";
import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { Rolls, Stats } from "../system/Stats";
import { Attack, AttackType } from "../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../system/attacks/AttackModifier";
import { EffectAttribute } from "../system/effects/Effect";

// assumption: qq always draws 3 tiles before enhanced basic

export class Qingque extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    turns: number = 0;
    lightCone: LightCone;
    relicSets: RelicSet[];
    hiddenHand: boolean = false;

    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = []
    ) {
        const stats = new Stats(
            {
                health: 1023,
                defense: 441,
                attack: 653,
                speed: 98,
                maxEnergy: 140,
            },
            substats
        );
        // sub traces
        stats.percentAttack += 0.28;
        stats.quantumDamageBoost += 0.144;
        stats.percentDefense += 0.125;

        super("Qingque", stats);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
        lightCone.linkCharacter(this);
    }

    act(game: Game): void {
        this.turns++;

        for (let i = 0; i < 3; i++) {
            if (game.skillPoints <= 0) {
                break;
            }
            this.skill(game);
        }

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }

        this.basic(game);
    }

    basic(game: Game) {
        let buffedStats = this.preAttackStats(game);

        if (this.hiddenHand) {
            buffedStats.percentAttack += 0.72; // 4 of a kind buff
        }

        let target = game.getRandomEnemy();

        // level 6
        let attack = new Attack(
            buffedStats,
            (atk) => {
                return atk * (2.4 + 1 + 1); // 3 enemies
            },
            [AttackType.Basic],
            target
        );

        attack = this.preAttackModifiers(game, attack);

        let damage = attack.calcDamage();

        console.log(`${damage} dmg by seele`);

        this.totalDamage += damage;
        this.currentEnergy += 20;
    }

    skill(game: Game) {
        game.removeSkillPoint();
    }

    ult(game?: Game) {
        this.currentEnergy = 5;
    }

    preAttackStats(game: Game): Stats {
        let buffedStats = this.stats.clone();

        for (const set of this.relicSets) {
            buffedStats = set.modifyStats(buffedStats);
        }

        buffedStats = this.lightCone.modifyCharacterStats(game, buffedStats);

        for (const effect of this.effects) {
            if (effect.attributes.includes(EffectAttribute.Stat)) {
                buffedStats = effect.modifyStats(buffedStats);
            }
        }
        return buffedStats;
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
