import { RelicSet } from "../../system/RelicSet";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Musketeer extends RelicSet {
    constructor(pieces: 2 | 4) {
        super("Musketeer of Wild Wheat", pieces);
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.percentAttack += 0.12;
        if (this.pieces == 4) {
            // TODO: change speed calcs to allow for % increases
            newStats.speed += 0;
        }
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        if (this.pieces == 4 && attack.types.includes(AttackType.Basic)) {
            attack.addModifier(
                new AttackModifier(
                    AttackModifierType.DamageBoost,
                    0.1,
                    "musketeer"
                )
            );
        }
        return attack;
    }
}
