import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class TestBuff extends Effect {
    constructor(player: Player) {
        super("Test buff", 3, EffectType.Buff, [EffectAttribute.Stat], Target.Player, player, TickDownTime.TurnEnd);
    }

    modifyStats(player: Player): Stats {
        const stats = player.stats.clone();
        stats.critDamage += 0.1;
        return stats;
    }
}
