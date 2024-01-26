import { Player } from "../Player";
import { Stats } from "../Stats";
import { Effect, EffectAttribute, EffectType, Target, TickDownTime } from "./Effect";

export abstract class StatEffect extends Effect {
    constructor(
        name: string,
        duration: number,
        type: EffectType,
        targetting: Target,
        owner: Player,
        tickDownTime: TickDownTime
    ) {
        super(
            name,
            duration,
            type,
            EffectAttribute.Stat,
            targetting,
            owner,
            tickDownTime
        );
    }

    abstract modifyStats(player: Player): Stats;
}
