import { Game } from "./Game";
import { LightCone } from "./LightCone";
import { Player } from "./Player";
import { RelicSet } from "./RelicSet";
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
    relicSets: RelicSet[];
    totalDamage: number = 0;
    turns: number = 0;
    lightCone: LightCone;

    constructor(name: string, stats: Stats, element: Element) {
        super(name, stats.speed, stats);
        this.element = element;
    }

    abstract act(game: Game): void;

    abstract damage(game: Game, damage: number): void;

    abstract printTotalDamage(): number;

    regenerateEnergy(amount: number) {
        this.currentEnergy = Math.min(
            this.stats.maxEnergy,
            this.currentEnergy +
                amount * (1 + this.stats.energyRegenerationRate)
        );
    }

    setup(game: Game) {
        for (let set of this.relicSets) {
            set.setup(game);
        }
        return;
    }
}
