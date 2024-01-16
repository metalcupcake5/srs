import { Stats } from "./Stats";
import { Attack } from "./attacks/Attack";

export abstract class RelicSet {
    name: string;
    pieces: number;

    constructor(name: string, pieces: number) {
        this.name = name;
        this.pieces = pieces;
    }

    abstract modifyStats(stats: Stats): Stats;

    abstract modifyAttack(attack: Attack): Attack;
}
