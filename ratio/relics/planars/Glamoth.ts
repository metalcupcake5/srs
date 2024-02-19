import { PlanarSet } from "../../system/PlanarSet";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Glamoth extends PlanarSet {
    constructor() {
        super("Firmament Frontline: Glamoth");
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.percentAttack += 0.12;
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        let speed = attack.stats.speed;
        if (speed >= 135) {
            attack.addModifier(
                new AttackModifier(
                    AttackModifierType.DamageBoost,
                    speed >= 160 ? 0.18 : 0.12,
                    "glamoth"
                )
            );
        }
        return attack;
    }
}
