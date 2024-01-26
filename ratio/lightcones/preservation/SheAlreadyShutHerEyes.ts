import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";

/*
Increases the wearer's Max HP by 24% and Energy Regeneration Rate by 12%. 
When the wearer's HP is reduced, all allies' DMG dealt increases by 9%, lasting for 2 turn(s).
At the start of every wave, restores HP to all allies by an amount equal to 80% of their respective lost HP.
*/

export class SheAlreadyShutHerEyes extends LightCone {
    constructor() {
        super("She Already Shut Her Eyes", {
            health: 1270,
            attack: 423,
            defense: 529,
        });
    }

    linkCharacter(character: Character) {
        this.character = character;
        this.character.stats.percentHealth += 0.24;
        this.character.stats.energyRegenerationRate += 0.12;
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        return stats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        return attack;
    }
}
