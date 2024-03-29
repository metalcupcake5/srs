import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";
import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class SparkleDamageBoost extends Effect {
    constructor(player: Player) {
        super(
            "Damage Boost (Sparkle)",
            2,
            EffectType.Buff,
            [EffectAttribute.AttackModifier],
            Target.Player,
            player,
            TickDownTime.TurnEnd,
            1
        );
    }

    modifyStats(stats: Stats): Stats {
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        attack.addModifier(
            new AttackModifier(
                AttackModifierType.DamageBoost,
                0.06 * this.stacks,
                `sparkle skill point usage damage boost (${this.stacks} stacks)`
            )
        );
        return attack;
    }

    addStack() {
        this.stacks = Math.min(3, this.stacks + 1);
    }

    resetDuration() {
        this.duration = 2;
    }
}
