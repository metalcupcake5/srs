import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { Rolls, Stats } from "../system/Stats";

export class Arlan extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    currentHealth: number;
    turns: number = 0;
    lightCone;

    constructor(lightCone, substats: Rolls) {
        const stats = new Stats(
            {
                health: 1200,
                defense: 331,
                attack: 600,
                speed: 102,
                maxEnergy: 110,
            },
            substats
        );
        super("Arlan", lightCone.character(stats));
        this.lightCone = lightCone;
        this.currentHealth = this.stats.totalHealth();
    }

    act(game: Game): void {
        this.turns++;
        let percentHealthLost = 1 - this.currentHealth / this.stats.baseHealth;
        if (this.currentEnergy >= this.stats.maxEnergy) {
            let damage = this.lightCone.ult({
                damage: (atk) => {
                    return (
                        (atk * 3.2 + atk + 1.6 * 2) *
                        (1 + Math.min(percentHealthLost, 0.72))
                    );
                },
                stats: this.stats,
            });
            this.totalDamage += damage;
            this.currentEnergy = 5;
        }
        this.currentHealth = Math.max(
            this.currentHealth - this.stats.baseHealth * 0.15,
            1
        );
        // console.log(1 + Math.min(percentHealthLost, 0.72));
        let damage = this.lightCone.skill({
            damage: (atk) => {
                return atk * 2.4 * (1 + Math.min(percentHealthLost, 0.72));
            },
            stats: this.stats,
        });
        this.totalDamage += damage;
        this.currentEnergy += 20;
    }

    damage(damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by arlan: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
