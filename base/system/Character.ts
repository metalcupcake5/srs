import { Game } from "./Game";
import { Player } from "./Player";
import { Stats } from "./Stats";

export abstract class Character extends Player {
    constructor(name: string, stats: Stats) {
        super(name, stats.speed, stats);
    }

    abstract act(game: Game): void;

    abstract damage(damage: number): void;

    abstract printTotalDamage(): number;
}
