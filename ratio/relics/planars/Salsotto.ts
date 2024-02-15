import { PlanarSet } from "../../system/PlanarSet";
import { RelicSet } from "../../system/RelicSet";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Salsotto extends PlanarSet {
    constructor() {
        super("Inert Salsotto");
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.critRate += 0.08;
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        if (
            attack.types.includes(AttackType.FollowUp) ||
            attack.types.includes(AttackType.Ultimate)
        ) {
            if (attack.stats.critRate >= 0.5) {
                attack.addModifier(
                    new AttackModifier(
                        AttackModifierType.DamageBoost,
                        0.15,
                        "salsotto"
                    )
                );
            }
        }
        return attack;
    }
}
