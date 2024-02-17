import { Attack } from "../../system/attacks/Attack";
import { Character, Element } from "../../system/Character";
import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class Nocturne extends Effect {
    quantumTeammates: number;
    constructor(player: Player, quantumTeammates: number) {
        super(
            "Nocturne",
            1,
            EffectType.Buff,
            [EffectAttribute.Stat],
            Target.Player,
            player,
            TickDownTime.Never
        );
        this.quantumTeammates = quantumTeammates;
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        let scaling = [0, 0.05, 0.15, 0.3];
        newStats.percentAttack +=
            0.15 +
            ((this.owner as Character).element == Element.Quantum
                ? scaling[this.quantumTeammates]
                : 0);
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }
}
