import { Action, ActionType } from "../system/Action";
import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { Stats } from "../system/Stats";

export class Dummy extends Character {
    totalDamage: number = 0;
    turns: number = 0;
    // lightCone;

    constructor(name: string) {
        const stats = new Stats(
            {
                health: 0,
                defense: 0,
                attack: 0,
                speed: 125,
                maxEnergy: 0,
            },
            true,
            {}
        );

        super(name, stats, Element.Physical);
    }

    act(game: Game): void {
        this.turns++;
        const target = game.getRandomEnemy();
        target.damage(game, 1);
        game.addSkillPoint(this);
        game.actions.push(new Action(game, this, ActionType.Damage));
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by dummy: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
