import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { RelicSet } from "../system/RelicSet";
import { Rolls, Stats } from "../system/Stats";
import { Attack, AttackType } from "../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../system/attacks/AttackModifier";

export class Ratio extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    turns: number = 0;
    lightCone;
    relicSets: RelicSet[];
    // When Dr. Ratio uses his Skill, for every debuff on the target,
    // his CRIT Rate increases by 2.5% and CRIT DMG by 5%. This effect can stack up to 6 time(s).
    summationStacks = 3;

    constructor(lightCone, substats: Rolls, relicSets: RelicSet[]) {
        const stats = new Stats(
            {
                health: 1048,
                defense: 461,
                attack: 776,
                speed: 103,
                maxEnergy: 140,
            },
            substats
        );
        // sub traces
        stats.critRate += 0.12;
        stats.percentAttack += 0.28;
        stats.percentDefense += 0.125;

        super("Dr. Ratio", lightCone.character(stats));

        this.lightCone = lightCone;
        this.relicSets = relicSets;
    }

    act(game: Game): void {
        this.turns++;

        const target = game.getRandomEnemy();

        this.skill();

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }
    }

    skill() {
        let buffedStats = this.stats.clone();

        buffedStats.critRate += this.summationStacks * 0.025;
        buffedStats.critDamage += this.summationStacks * 0.05;

        for (const set of this.relicSets) {
            buffedStats = set.modifyStats(buffedStats);
        }

        let attack = new Attack(
            buffedStats,
            (atk) => {
                return atk * 1.5;
            },
            [AttackType.Skill]
        );

        attack.addModifier(
            new AttackModifier(AttackModifierType.DamageBoost, 0.1 * 3) // a2 trace: 10% damage increase per debuff on target
        );

        for (const set of this.relicSets) {
            attack = set.modifyAttack(attack);
        }
        attack = this.lightCone.modifyAttack(attack);

        let damage = attack.calcDamage();

        this.totalDamage += damage;
        this.currentEnergy += 20;
        this.followUp();
    }

    ult(game?: Game) {
        let buffedStats = this.stats.clone();

        for (const set of this.relicSets) {
            buffedStats = set.modifyStats(buffedStats);
        }

        let enemy = game.enemies[0];
        enemy.wisemanFolly = 2;
        let attack = new Attack(
            buffedStats,
            (atk) => {
                return atk * 2.4;
            },
            [AttackType.Ultimate]
        );

        for (const set of this.relicSets) {
            attack = set.modifyAttack(attack);
        }
        attack = this.lightCone.modifyAttack(attack);

        let damage = attack.calcDamage();

        this.totalDamage += damage;
        this.currentEnergy = 5;
    }

    followUp() {
        let buffedStats = this.stats.clone();

        for (const set of this.relicSets) {
            buffedStats = set.modifyStats(buffedStats);
        }

        let attack = new Attack(
            buffedStats,
            (atk) => {
                return atk * 2.7;
            },
            [AttackType.Skill]
        );

        for (const set of this.relicSets) {
            attack = set.modifyAttack(attack);
        }
        attack = this.lightCone.modifyAttack(attack);

        let damage = attack.calcDamage();

        this.totalDamage += damage;
        this.currentEnergy += 5;
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