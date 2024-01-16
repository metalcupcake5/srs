import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { Rolls, Stats } from "../system/Stats";

export class Ratio extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    turns: number = 0;
    lightCone;
    // When Dr. Ratio uses his Skill, for every debuff on the target,
    // his CRIT Rate increases by 2.5% and CRIT DMG by 5%. This effect can stack up to 6 time(s).
    summationStacks = 0;

    constructor(lightCone, substats: Rolls) {
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
    }

    act(game: Game): void {
        this.turns++;

        const target = game.getRandomEnemy();

        const buffedStats = Object.assign(
            Object.create(Object.getPrototypeOf(this.stats)),
            this.stats
        );

        buffedStats.critRate += this.summationStacks * 0.025;
        buffedStats.critDamage += this.summationStacks * 0.05;

        let damage = this.lightCone.skill({
            damage: (atk) => {
                return atk * 1.5;
            },
            stats: buffedStats,
        });
        this.totalDamage += damage;
        this.currentEnergy += 20;

        if (this.currentEnergy >= this.stats.maxEnergy) {
            let enemy = game.enemies[0];
            enemy.wisemanFolly = 2;
            let damage = this.lightCone.ult({
                damage: (atk) => {
                    return atk * 2.4;
                },
                stats: buffedStats,
            });
            this.totalDamage += damage;
            this.currentEnergy = 5;
        }
    }

    followUp() {
        let damage = this.lightCone.followUp({
            damage: (atk) => {
                return atk * 2.7;
            },
            stats: this.stats,
            debuffs: 0,
        });

        this.totalDamage += damage;
        this.currentEnergy += 5;
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    addSummationStacks() {
        this.summationStacks = Math.min(6, this.summationStacks + 3);
    }

    printTotalDamage() {
        console.log(
            `total damage by ratio: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
