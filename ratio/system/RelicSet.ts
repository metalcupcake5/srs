import { Game } from "./Game";
import { Stats } from "./Stats";
import { Attack } from "./attacks/Attack";

export abstract class RelicSet {
    name: string;
    pieces: number;

    constructor(name: string, pieces: 2 | 4) {
        this.name = name;
        this.pieces = pieces;
    }

    modifyStats(stats: Stats): Stats {
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }

    setup(game: Game) {
        return;
    }
}
