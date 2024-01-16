import { Ratio } from "../characters/Ratio";
import { Game } from "./Game";
import { Player } from "./Player";
import { Stats } from "./Stats";

export class Enemy extends Player {
    debuffs: number = 0;

    constructor(name: string, speed: number) {
        super(name, speed, new Stats({ speed: speed }));
    }

    act(game: Game): void {
        let target: Player =
            game.characters[Math.floor(Math.random() * game.characters.length)];
        // target.damage(1);
        console.log("follow up 1");
        (target as Ratio).followUp();
        console.log("follow up 2");
        (target as Ratio).followUp();
    }

    damage(damage: number): void {}
}
