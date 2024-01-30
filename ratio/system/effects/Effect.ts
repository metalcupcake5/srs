import { Player } from "../Player";
import { Stats } from "../Stats";
import { Attack } from "../attacks/Attack";

export enum EffectType {
    Buff,
    Debuff,
}

export enum EffectAttribute {
    Stat,
    AttackModifier,
}

export enum Target {
    Global,
    Player,
}

export enum TickDownTime {
    TurnStart,
    TurnEnd,
}

export abstract class Effect {
    name: string;
    duration: number;
    type: EffectType;
    attributes: EffectAttribute[];
    targetting: Target;
    owner: Player;
    tickDownTime: TickDownTime;

    constructor(
        name: string,
        duration: number,
        type: EffectType,
        attributes: EffectAttribute[],
        targetting: Target,
        owner: Player,
        tickDownTime: TickDownTime
    ) {
        [
            this.name,
            this.duration,
            this.type,
            this.attributes,
            this.targetting,
            this.owner,
            this.tickDownTime,
        ] = [name, duration, type, attributes, targetting, owner, tickDownTime];
    }

    abstract modifyStats(stats: Stats): Stats;
    abstract modifyAttack(attack: Attack): Attack
}
