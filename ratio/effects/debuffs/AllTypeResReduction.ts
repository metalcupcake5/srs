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

export class AllTypeResReduction extends Effect {
    constructor(player: Player) {
        super(
            "All-Type Res Reduction",
            2,
            EffectType.Debuff,
            [EffectAttribute.AttackModifier],
            Target.Player,
            player,
            TickDownTime.TurnEnd
        );
    }

    modifyStats(stats: Stats): Stats {
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        attack.addModifier(
            new AttackModifier(
                AttackModifierType.ResistanceReduction,
                0.1,
                "silver wolf skill"
            )
        );
        return attack;
    }
}
