import {
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { StatEffect } from "../../system/effects/StatEffect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class TestBuff extends StatEffect {
    constructor(player: Player) {
        super(
            "Test buff",
            3,
            Target.Player,
            player,
            TickDownTime.TurnEnd
        );
    }

    modifyStats(player: Player): Stats {
        const stats = player.stats.clone();
        stats.critDamage += 0.10;
        return stats;
    }
}
