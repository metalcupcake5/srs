import { Attack, AttackType } from "../../system/attacks/Attack";
import { AttackModifier, AttackModifierType } from "../../system/attacks/AttackModifier";
import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class QingqueDamageBoost extends Effect {
    constructor(player: Player) {
        super(
            "Damage Boost (Qingque)",
            0,
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
        if(attack.types.includes(AttackType.Basic)) {
            attack.addModifier(new AttackModifier(AttackModifierType.DamageBoost, 0.28 * this.stacks))
        }
        return attack;
    }

    addStack() {
        this.stacks++;
    }
}
