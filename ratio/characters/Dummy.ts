import { Action, ActionType } from "../system/Action";
import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { Stats } from "../system/Stats";

export class Dummy extends Character {
    totalDamage: number = 0;
    turns: number = 0;
    // lightCone;

    constructor() {
        const stats = new Stats(
            {
                health: 1048,
                defense: 461,
                attack: 776,
                speed: 100,
                maxEnergy: 140,
            },
            {}
        );

        super("dummy test char", stats, Element.Physical);
    }

    act(game: Game): void {
        this.turns++;
        const target = game.getRandomEnemy();
        target.damage(game, 1);
        game.addSkillPoint();
        game.actions.push(new Action(game, this, ActionType.Damage, 1));
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
