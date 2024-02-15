import { Element } from "../../system/Character";
import { Enemy } from "../../system/Enemy";
import { RelicSet } from "../../system/RelicSet";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Genius extends RelicSet {
    constructor(pieces: 2 | 4) {
        super("Genius of Brilliant Stars", pieces);
    }

    modifyStats(stats: Stats): Stats {
        return stats;
    }

    modifyAttack(attack: Attack): Attack {
        attack.addModifier(
            new AttackModifier(
                AttackModifierType.DamageBoost,
                0.1,
                "genius 2pc"
            )
        );
        if (this.pieces == 4) {
            let quaWeak = (attack.target as Enemy).elements.includes(
                Element.Quantum
            );
            attack.addModifier(
                new AttackModifier(
                    AttackModifierType.DefenseDown,
                    quaWeak ? 0.2 : 0.1,
                    "genius 4pc" + quaWeak ? " (qua weak)" : ""
                )
            );
        }
        return attack;
    }
}
