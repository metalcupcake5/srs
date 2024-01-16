import { Game } from "./Game";
import { Stats } from "./Stats";

export abstract class Player {
    name: string;
    speed: number;
    actionValue: number;
    stats: Stats;

    constructor(name: string, speed: number, stats: Stats) {
        this.name = name;
        this.speed = speed;
        this.actionValue = 10_000 / speed;
        this.stats = stats;
    }

    abstract act(game: Game): void;

    abstract damage(damage: number): void;

    resetActionValue(): void {
        this.actionValue = 10_000 / this.stats.speed;
    }

    printActionValue(): void {
        console.log(`${this.name}: ${Math.floor(this.actionValue)} AV`);
    }
}
