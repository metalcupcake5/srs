import { Game } from "./Game";
import { Stats } from "./Stats";
import { Effect } from "./effects/Effect";

export abstract class Player {
    name: string;
    speed: number;
    actionValue: number;
    stats: Stats;
    effects: Effect[];

    constructor(name: string, speed: number, stats: Stats) {
        this.name = name;
        this.speed = speed;
        this.actionValue = 10_000 / speed;
        this.stats = stats;
        this.effects = [];
    }

    abstract act(game: Game): void;

    abstract damage(game: Game, damage: number): void;

    resetActionValue(): void {
        this.actionValue = 10_000 / this.stats.speed;
    }

    printActionValue(): void {
        console.log(`${this.name}: ${Math.floor(this.actionValue)} AV`);
    }

    addEffect(effect: Effect) {
        this.effects.push(effect);
    }
}
