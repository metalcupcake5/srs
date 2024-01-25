import { Player } from "../Player";
import { Stats } from "../Stats";
import { Effect, EffectType, Target, TickDownTime } from "./Effect";

export abstract class StatEffect extends Effect {
    constructor(
        name: string,
        duration: number,
        targetting: Target,
        owner: Player,
        tickDownTime: TickDownTime
    ) {
        super(name, duration, EffectType.Stat, targetting, owner, tickDownTime)
    }

    abstract modifyStats(player: Player): Stats;
}