import { Game } from "./Game";
import { Stats } from "./Stats";
import { Effect, Target, TickDownTime } from "./effects/Effect";

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

    tickDownEffects(game: Game, time: TickDownTime) {
        for (const effect of this.effects) {
            if (effect.tickDownTime === time && effect.owner === this) {
                effect.duration--;
                if (effect.duration < 0) {
                    if (effect.targetting == Target.Global) {
                        for (const character of game.characters) {
                            character.effects = character.effects.filter(
                                (e) => e != effect
                            );
                        }
                    }
                    this.effects = this.effects.filter((e) => e != effect);
                }
            }
        }
    }

    advanceForward(amount: number) {
        let currentAG = this.actionValue * this.stats.speed;
        this.actionValue =
            Math.max(0, currentAG - 10_000 * amount) / this.speed;
    }
}
