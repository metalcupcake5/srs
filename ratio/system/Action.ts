import { Character } from "./Character";
import { Game } from "./Game";
import { Player } from "./Player";
import { Stats } from "./Stats";
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
    stats: Stats;
    effects: any[];

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
        this.stats =
            character instanceof Character
                ? (character as Character).preAttackStats(game)
                : character.stats.clone();
        this.effects = [];
        for (const e of character.effects) {
            this.effects.push({
                name: e.name,
                duration: e.duration,
                stacks: e.stacks,
                tickDownTime: e.tickDownTime,
            });
        }
    }
}
