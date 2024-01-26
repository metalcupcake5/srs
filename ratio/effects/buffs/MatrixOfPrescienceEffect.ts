import { EffectType, Target, TickDownTime } from "../../system/effects/Effect";
import { StatEffect } from "../../system/effects/StatEffect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

/*
Increases the wearer's Max HP by 24% and Energy Regeneration Rate by 12%. 
When the wearer's HP is reduced, all allies' DMG dealt increases by 9%, lasting for 2 turn(s).
At the start of every wave, restores HP to all allies by an amount equal to 80% of their respective lost HP.

TODO middle
*/

export class MatrixOfPrescienceEffect extends StatEffect {
    constructor(player: Player) {
        super(
            "Matrix of Prescience",
            3,
            EffectType.Buff,
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
