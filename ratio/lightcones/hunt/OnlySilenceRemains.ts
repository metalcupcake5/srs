import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";

/*
Increases the wearer's ATK by 16%. 
If there are 2 or fewer enemies on the field, increases wearer's CRIT Rate by 12%.
*/

export class OnlySilenceRemains extends LightCone {
    constructor() {
        super("Only Silence Remains", {
            health: 953,
            attack: 476,
            defense: 331,
        });
    }

    linkCharacter(character: Character) {
        this.character = character;
        this.character.stats.percentAttack += 0.16;
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        let newStats = stats.clone();

        if (game.enemies.length <= 2) {
            newStats.critRate += 0.12;
        }
        return newStats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        return attack;
    }
}
