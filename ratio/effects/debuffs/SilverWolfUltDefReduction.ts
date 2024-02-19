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

export class SilverWolfUltDefReduction extends Effect {
    constructor(player: Player) {
        super(
            "Def Reduction (Silver Wolf Ult)",
            3,
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
                AttackModifierType.DefenseDown,
                0.45,
                "silver wolf ult"
            )
        );
        return attack;
    }
}
