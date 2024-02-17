import { Character } from "./Character";
import { Game } from "./Game";
import { Player } from "./Player";
import { Attack } from "./attacks/Attack";

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
    attack: Attack | null;

    constructor(
        game: Game,
        character: Player,
        action: ActionType,
        attack?: Attack
    ) {
        this.av = game.totalAV;
        this.name = character.name;
        this.action = action;
        this.damage = attack?.calcDamage() || 0;
        this.skillPoints = game.skillPoints;
        this.energy =
            character instanceof Character
                ? (character as Character).currentEnergy
                : 0;
        this.attack = attack || null;
    }
}
