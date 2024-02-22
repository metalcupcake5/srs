import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class Tutorial extends LightCone {
    constructor() {
        super("Before the Tutorial Mission Starts", {
            health: 953,
            attack: 476,
            defense: 331,
        });
    }

    linkCharacter(game: Game, character: Character) {
        this.character = character;
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.effectHitRate += 0.2;
        return newStats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        // TODO When the wearer attacks DEF-reduced enemies, regenerates 4 Energy.
        return attack;
    }
}
