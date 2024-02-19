import { Game } from "./Game";
import { RelicSet } from "./RelicSet";
import { Stats } from "./Stats";
import { Attack } from "./attacks/Attack";

export abstract class PlanarSet extends RelicSet {
    constructor(name: string) {
        super(name, 2);
    }
}
