import { Game } from "./Game";

export enum ActionType {
    Basic = "basic attack",
    Skill = "skill",
    Ultimate = "ultimate",
    Damage = "damage",
}

export class Action {
    av: number;
    name: string;
    action: ActionType;
    damage: number;
    skillPoints: number;

    constructor(game: Game, charName: string, action: ActionType, damage = 0, ) {
        this.av = game.totalAV;
        this.name = charName;
        this.action = action;
        this.damage = damage;
        this.skillPoints = game.skillPoints;
    }
}

/* ame.actions.push({
            av: game.totalAV,
            name: this.name,
            action: "damage",
            damage: 1,
        });*/