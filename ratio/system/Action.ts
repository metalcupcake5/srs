import { Character } from "./Character";
import { Game } from "./Game";
import { Player } from "./Player";

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
    energy: number;
    attack: number;

    constructor(game: Game, character: Player, action: ActionType, damage = 0) {
        this.av = game.totalAV;
        this.name = character.name;
        this.action = action;
        this.damage = damage;
        this.skillPoints = game.skillPoints;
        this.energy =
            character instanceof Character
                ? (character as Character).currentEnergy
                : 0;
        this.attack = character.stats.totalAttack();
    }
}
