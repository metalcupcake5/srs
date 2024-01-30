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

// increases DMG dealt by 36% and enables their follow-up attacks to ignore 24% of the target's DEF.

export class Disputation extends Effect {
    constructor(player: Player) {
        super(
            "Disputation",
            2,
            EffectType.Buff,
            [EffectAttribute.AttackModifier],
            Target.Player,
            player,
            TickDownTime.TurnEnd
        );
    }

    modifyStats(player: Player): Stats {
        return player.stats;
    }

    modifyAttack(attack: Attack): Attack {
        attack.addModifier(
            new AttackModifier(AttackModifierType.DamageBoost, 0.36)
        );
        if (attack.types.includes(AttackType.FollowUp)) {
            attack.addModifier(
                new AttackModifier(AttackModifierType.DefenseDown, 0.24)
            );
        }
        return attack;
    }
}
