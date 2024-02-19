// import { Ratio } from "../characters/Ratio";
import { Action, ActionType } from "./Action";
import { Element } from "./Character";
import { Game } from "./Game";
import { Player } from "./Player";
import { Stats } from "./Stats";
import { Attack } from "./attacks/Attack";
import { AttackModifierType } from "./attacks/AttackModifier";
import { EffectAttribute } from "./effects/Effect";

export class Enemy extends Player {
    debuffs: number = 0;
    wisemanFolly: number = 0;
    elements: Element[];

    constructor(name: string, speed: number, elements: Element[] = []) {
        super(name, speed, new Stats({ speed: speed }, false));
        this.elements = elements;
    }

    act(game: Game): void {
        game.actions.push(new Action(game, this, ActionType.Damage));
    }

    damage(game: Game, damage: number): void {
        // if (this.wisemanFolly > 0) {
        //     (game.characters[0] as Ratio).followUp(game);
        //     this.wisemanFolly--;
        // }
    }

    modifyAttack(game: Game, attack: Attack) {
        for (const e of this.effects) {
            if (e.attributes.includes(EffectAttribute.AttackModifier)) {
                e.modifyAttack(attack);
            }
        }
    }
}
