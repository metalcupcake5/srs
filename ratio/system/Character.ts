import { Game } from "./Game";
import { Player } from "./Player";
import { Stats } from "./Stats";

export enum Element {
    Physical = "physical",
    Fire = "fire",
    Ice = "ice",
    Lightning = "lightning",
    Wind = "wind",
    Quantum = "quantum",
    Imaginary = "imaginary",
}

export abstract class Character extends Player {
    currentEnergy: number = 0;
    element: Element;

    constructor(name: string, stats: Stats, element: Element) {
        super(name, stats.speed, stats);
        this.element = element;
    }

    abstract act(game: Game): void;

    abstract damage(game: Game, damage: number): void;

    abstract printTotalDamage(): number;

    regenerateEnergy(amount: number) {
        this.currentEnergy += amount * (1 + this.stats.energyRegenerationRate);
    }
}
