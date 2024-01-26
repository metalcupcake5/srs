import { Ratio } from "../characters/Ratio";
import { Game } from "./Game";
import { Player } from "./Player";
import { Stats } from "./Stats";

export class Enemy extends Player {
    debuffs: number = 0;
    wisemanFolly: number = 0;

    constructor(name: string, speed: number) {
        super(name, speed, new Stats({ speed: speed }));
    }

    act(game: Game): void {}

    damage(game: Game, damage: number): void {
        if (this.wisemanFolly > 0) {
            (game.characters[0] as Ratio).followUp(game);
            this.wisemanFolly--;
        }
    }
}
