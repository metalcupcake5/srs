import { Element } from "../../system/Character";
import { Game } from "../../system/Game";
import { PlanarSet } from "../../system/PlanarSet";
import { Stats } from "../../system/Stats";

export class Penacony extends PlanarSet {
    element: Element;

    constructor(userElement: Element) {
        super("Penacony, Land of the Dreams");
        this.element = userElement;
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.energyRegenerationRate += 0.05;
        return newStats;
    }

    setup(game: Game) {
        for (let char of game.characters) {
            char.stats[`${this.element}DamageBoost`] += 0.1;
        }
    }
}
