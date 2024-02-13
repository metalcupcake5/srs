import { Attack } from "../../system/attacks/Attack";
import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class HiddenHand extends Effect {
    constructor(player: Player) {
        super(
            "Hidden Hand",
            0,
            EffectType.Buff,
            [EffectAttribute.Stat],
            Target.Player,
            player,
            TickDownTime.TurnEnd
        );
    }

    modifyStats(stats: Stats): Stats {
        stats.percentAttack += 0.72;
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }
}
