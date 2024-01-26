import { EffectType, Target, TickDownTime } from "../../system/effects/Effect";
import { StatEffect } from "../../system/effects/StatEffect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class Disputation extends StatEffect {
    constructor(player: Player) {
        super("Disputation", 2, EffectType.Buff, Target.Player, player, TickDownTime.TurnEnd);
    }

    modifyStats(player: Player): Stats {
        const stats = player.stats.clone();
        stats.critDamage += 0.1;
        return stats;
    }
}
