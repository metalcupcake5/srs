import { Player } from "../Player";

export enum EffectType {
    Stat,
    AttackModifier,
}

export enum Target {
    Global,
    Player,
}

export enum TickDownTime {
    OwnerTurnStart,
    OwnerTurnEnd,
    TurnStart,
    TurnEnd,
}

export abstract class Effect {
    name: string;
    duration: number;
    type: EffectType;
    targetting: Target;
    owner: Player;
    tickDownTime: TickDownTime;

    constructor(
        name: string,
        duration: number,
        type: EffectType,
        targetting: Target,
        owner: Player,
        tickDownTime: TickDownTime
    ) {
        [
            this.name,
            this.duration,
            this.type,
            this.targetting,
            this.owner,
            this.tickDownTime,
        ] = [name, duration, type, targetting, owner, tickDownTime];
    }
}
