import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

/*
S5
Increases the wearer's DMG by 24%. 
For every enemy defeated by the wearer, the wearer's ATK increases by 8%, stacking up to 3 time(s).
*/

export class TheSeriousnessOfBreakfast extends LightCone {
    constructor() {
        super("The Seriousness of Breakfast", {
            health: 847,
            attack: 476,
            defense: 397,
        });
    }

    linkCharacter(game: Game, character: Character) {
        this.character = character;
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        // For every enemy defeated by the wearer, the wearer's ATK increases by 8%, stacking up to 3 time(s).
        return stats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        attack.addModifier(
            new AttackModifier(
                AttackModifierType.DamageBoost,
                0.24, // 24 at s5
                "seriousness of breakfast"
            )
        );

        return attack;
    }
}
