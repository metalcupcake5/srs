import { Disputation } from "../../effects/buffs/Disputation";
import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";

/*
Increases the wearer's CRIT DMG by 20%.
For every debuff on the enemy target, the wearer's CRIT DMG dealt against this target increases by 8%, stacking up to 3 times.
When using Ultimate to attack the enemy target, the wearer receives the Disputation effect,
which increases DMG dealt by 36% and enables their follow-up attacks to ignore 24% of the target's DEF. This effect lasts for 2 turns.

TODO last 2
*/

export class BaptismOfPureThought extends LightCone {
    constructor() {
        super("Baptism of Pure Thought", {
            health: 953,
            attack: 582,
            defense: 529,
        });
    }

    linkCharacter(character: Character) {
        this.character = character;
        this.character.stats.critDamage += 0.2;
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        return stats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        // TODO enemy system in attack to add other effects

        if (attack.types.includes(AttackType.Ultimate)) {
            player.addEffect(new Disputation(player));
        }

        return attack;
    }
}
