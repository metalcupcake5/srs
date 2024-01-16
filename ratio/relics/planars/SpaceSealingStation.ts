import { PlanarSet } from "../../system/PlanarSet";
import { RelicSet } from "../../system/RelicSet";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";

export class SpaceSealingStation extends PlanarSet {
    constructor() {
        super("Space Sealing Station");
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        let speed = newStats.speed;
        newStats.percentAttack += 0.12 + (speed >= 120 ? 0.12 : 0);
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }
}
