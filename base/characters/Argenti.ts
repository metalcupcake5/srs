import { Character } from "../system/Character";
import { Enemy } from "../system/Enemy";
import { Game } from "../system/Game";
import { Stats } from "../system/Stats";

const sig = true;

function crit(damage, critRate, critDamage) {
    return Math.floor(
        damage * (1 + critDamage) * critRate + damage * (1 - critRate)
    );
}

export class Argenti extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    apotheosisStacks: number = 0;
    turns: number = 0;
    attacks: {
        skill: number;
        ult: number;
    } = {
        skill: 0,
        ult: 0,
    };
    lightCone;
    useUltImmediately: boolean;

    constructor(useUltImmediately: boolean, lightCone) {
        const stats = new Stats({
            health: 1048,
            defense: 364,
            attack: 737,
            speed: 103,
            maxEnergy: 180,
        });
        stats.critDamage = 1.361;
        stats.critRate = 0.755;
        super("Argenti", lightCone.character(stats));
        this.useUltImmediately = useUltImmediately;
        this.lightCone = lightCone;
        console.log(`use ult immediately is ${useUltImmediately}`);
    }

    /*
        argenti level 10 skills
            - skill
                - 120% atk to all enemies
            - ult (90 nrg)
                - 160% atk to all enemies
            - ult (180 nrg)
                - 280% atk to all enemies
                - 6 extra instances of bounce damage at 95% atk
            - talent
                - per enemy hit
                    - regenerates 3 energy
                    - stack of 2.5% crit rate, up to 10
                - also gains 1 stack per turn
    */

    act(game: Game): void {
        this.turns++;
        let enemies = [1, 2, 3];
        if (this.currentEnergy >= 90 && this.useUltImmediately) {
            this.attacks.ult++;
            let damage = crit(
                this.stats.attack * 1.6 * enemies.length,
                this.stats.critRate,
                this.stats.critDamage
            );
            damage = this.lightCone.ult(damage);
            this.totalDamage += damage;
            this.currentEnergy = 5;
            game.log(
                `argenti used 90nrg ult, damaged ${
                    enemies.length
                } enemies for ${Math.floor(damage)} dmg`
            );
            return;
        }
        if (this.currentEnergy >= 180 && !this.useUltImmediately) {
            this.attacks.ult++;
            let damage = crit(
                this.stats.attack * 2.8 * enemies.length,
                this.stats.critRate,
                this.stats.critDamage
            );
            damage += this.stats.attack * 0.95 * 6;
            damage = this.lightCone.ult(damage);
            this.totalDamage += damage;
            this.currentEnergy = 5;
            game.log(
                `argenti used 180nrg ult, damaged ${
                    enemies.length
                } enemies for ${Math.floor(damage)} dmg`
            );
            return;
        }
        if (this.currentEnergy != this.stats.maxEnergy) {
            this.attacks.skill++;
            let damage = crit(
                this.stats.attack * 1.2 * enemies.length,
                this.stats.critRate,
                this.stats.critDamage
            );
            this.totalDamage += damage;
            this.currentEnergy = Math.min(
                this.currentEnergy + 30,
                this.stats.maxEnergy
            );
            game.log(
                `argenti used skill, damaged ${
                    enemies.length
                } enemies for ${Math.floor(damage)} dmg`
            );
            return;
        }
        // console.log(
        //     `argenti does ${this.stats.attack * 1.6} damage to ${
        //         enemies.length
        //     } enemies`
        // );
    }

    damage(damage: number): void {
        // this.currentEnergy = Math.min(
        //     this.currentEnergy + 20,
        //     this.stats.maxEnergy
        // );
        // console.log(`argenti has ${this.currentEnergy} energy`);
        // this.stats.health -=
        //     damage *
        //     (1 - this.stats.defense / (this.stats.defense + 200 + 10 * 80));
    }

    printTotalDamage() {
        console.log(
            `total damage by Argenti: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        console.log(`${this.attacks.skill} skills | ${this.attacks.ult} ults`);
        return this.totalDamage;
    }
}
