import { RelicSet } from "../../system/RelicSet";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Wastelander extends RelicSet {
    constructor(pieces: 2 | 4) {
        super("Wastelander of Banditry Desert", pieces);
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        if (this.pieces == 4) {
            // assumes debuffed
            newStats.critRate += 0.1;
        }
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        // assumes always imaginary damage
        attack.addModifier(
            new AttackModifier(AttackModifierType.DamageBoost, 0.1)
        );

        return attack;
    }
}
