import { Attack } from "../../system/attacks/Attack";
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
import { SparkleDamageBoost } from "./SparkleDamageBoost";

export class Cipher extends Effect {
    constructor(player: Player) {
        super(
            "Cipher (Sparkle)",
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
        let damageBoost = this.owner.effects.find(
            (e) => e instanceof SparkleDamageBoost
        );
        if (damageBoost) {
            attack.addModifier(
                new AttackModifier(
                    AttackModifierType.DamageBoost,
                    0.1 * damageBoost.stacks,
                    `sparkle ultimate damage boost buff (${damageBoost.stacks} times)`
                )
            );
        }
        return attack;
    }

    resetDuration() {
        this.duration = 2;
    }
}
