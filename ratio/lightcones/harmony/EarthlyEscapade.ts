import { Mask } from "../../effects/buffs/Mask";
import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";

export class EarthlyEscapede extends LightCone {
    constructor() {
        super("Earthly Escapade", {
            health: 1164,
            attack: 529,
            defense: 463,
        });
    }

    linkCharacter(game: Game, character: Character) {
        this.character = character;

        let effect = new Mask(game, character);
        effect.duration = 3;

        for (const c of game.characters) {
            c.addEffect(effect);
        }
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.critDamage += 0.32;
        return newStats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        return attack;
    }
}
