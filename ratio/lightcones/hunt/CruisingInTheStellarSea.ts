import { Disputation } from "../../effects/buffs/Disputation";
import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";

/*
Increases the wearer's CRIT rate by 8%,
and increases their CRIT rateagainst enemies with HP less than or equal to 50% by an extra 8%. 
When the wearer defeats an enemy, their ATK is increased by 20% for 2 turn(s).

TODO last 2 buffs
*/

export class CruisingInTheStellarSea extends LightCone {
    constructor() {
        super("Cruising in the Stellar Sea", {
            health: 953,
            attack: 529,
            defense: 463,
        });
    }

    linkCharacter(character: Character) {
        this.character = character;
        this.character.stats.critRate += 0.08;
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
