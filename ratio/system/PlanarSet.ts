import { RelicSet } from "./RelicSet";
import { Stats } from "./Stats";
import { Attack } from "./attacks/Attack";

export abstract class PlanarSet extends RelicSet {
    constructor(name: string) {
        super(name, 2);
    }

    abstract modifyStats(stats: Stats): Stats;

    abstract modifyAttack(attack: Attack): Attack;
}
