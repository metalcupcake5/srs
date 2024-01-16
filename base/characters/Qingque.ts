import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { Stats } from "../system/Stats";

function crit(damage, critRate, critDamage) {
    return Math.floor(
        damage * (1 + critDamage) * critRate + damage * (1 - critRate)
    );
}

export class Qingque extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    turns: number = 0;
    lightCone;

    constructor(useUltImmediately: boolean, lightCone) {
        const stats = new Stats({
            health: 1023,
            defense: 441,
            attack: 653,
            speed: 98,
            maxEnergy: 140,
        });
        stats.critDamage = 1.394;
        stats.critRate = 0.719;
        super("QingQue", lightCone.character(stats));
        this.lightCone = lightCone;
    }

    act(game: Game): void {
        this.turns++;

        if (this.currentEnergy >= this.stats.maxEnergy) {
            let damage = crit(
                this.stats.attack * 2 * 3,
                this.stats.critRate,
                this.stats.critDamage
            );
            damage = this.lightCone.ult(damage, this);
            this.totalDamage += damage;
            this.currentEnergy = 5;
        }
        let damage = crit(
            this.stats.attack * 2.4 + this.stats.attack * 2,
            this.stats.critRate,
            this.stats.critDamage
        );
        damage = this.lightCone.skill(damage, this);
        this.totalDamage += damage;
        this.currentEnergy += 20;
        // game.log(
        //     `damaged ${enemies.length} enemies for ${Math.floor(damage)} dmg`
        // );
    }

    damage(damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by qq: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
