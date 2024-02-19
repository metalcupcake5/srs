import { Attack } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";
import { Element } from "../../system/Character";
import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class WeaknessImplant extends Effect {
    weakness: Element;

    constructor(player: Player, weakness: Element) {
        super(
            "Weakness Implant",
            2,
            EffectType.Debuff,
            [EffectAttribute.AttackModifier],
            Target.Player,
            player,
            TickDownTime.TurnEnd
        );
        this.weakness = weakness;
    }

    modifyStats(stats: Stats): Stats {
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        attack.addModifier(
            new AttackModifier(
                AttackModifierType.ResistanceReduction,
                0.2,
                "weakness implant resistance reduction"
            )
        ); // assumed attack is same type as implant, because of monoqua
        return attack;
    }
}
