import { Attack } from "../../system/attacks/Attack";
import { Effect, EffectAttribute, EffectType, Target, TickDownTime } from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

/*
all team members gain the Knowledge effect,
which increases their respective Max HP by 6% of Fu Xuan's Max HP,
and increases CRIT Rate by 12%.
*/

export class MatrixOfPrescienceEffect extends Effect {
    constructor(player: Player) {
        super(
            "Matrix of Prescience",
            3,
            EffectType.Buff,
            [EffectAttribute.Stat],
            Target.Global,
            player,
            TickDownTime.TurnEnd
        );
    }

    modifyStats(stats: Stats): Stats {
        stats.flatHealth += this.owner.stats.totalHealth() * 0.06;
        stats.critRate += 0.12;
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }

    resetDuration() {
        this.duration = 3;
    }
}
