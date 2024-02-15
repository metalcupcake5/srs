import { PlanarSet } from "../../system/PlanarSet";
import { RelicSet } from "../../system/RelicSet";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Rutilant extends PlanarSet {
    constructor() {
        super("Rutilant Arena");
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.critRate += 0.08;
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        if (attack.stats.critRate >= 0.7) {
            if (
                attack.types.includes(AttackType.Basic) ||
                attack.types.includes(AttackType.Skill)
            ) {
                attack.addModifier(
                    new AttackModifier(
                        AttackModifierType.DamageBoost,
                        0.2,
                        "rutilant"
                    )
                );
            }
        }
        return attack;
    }
}
