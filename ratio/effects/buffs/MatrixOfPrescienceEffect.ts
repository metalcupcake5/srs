import { EffectType, Target, TickDownTime } from "../../system/effects/Effect";
import { StatEffect } from "../../system/effects/StatEffect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class MatrixOfPrescienceEffect extends StatEffect {
    constructor(player: Player) {
        super(
            "Matrix of Prescience",
            3,
            Target.Global,
            player,
            TickDownTime.TurnEnd
        );
    }

    modifyStats(player: Player): Stats {
        const stats = player.stats.clone();
        stats.flatHealth += this.owner.stats.totalHealth() * 0.06;
        stats.critRate += 0.12;
        return stats;
    }

    resetDuration() {
        this.duration = 3;
    }
}
