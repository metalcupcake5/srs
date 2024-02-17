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

export class SparkleCritDamageBoost extends Effect {
    value: number;
    constructor(player: Player, critDamage: number) {
        super(
            "Crit Damage Boost (Sparkle)",
            1,
            EffectType.Buff,
            [EffectAttribute.Stat],
            Target.Player,
            player,
            TickDownTime.TurnStart // a4 extend to last until the start of the target's next turn
        );
        this.value = critDamage;
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.critDamage += this.value;
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }
}
