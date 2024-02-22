import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack, AttackType } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

/*
Increases the wearer's CRIT Rate by 18%. 
While the wearer is in battle, for every 10 SPD that exceeds 100, 
the DMG of the wearer's Basic ATK and Skill is increased by 6% 
and the CRIT DMG of their Ultimate is increased by 12%. 
This effect can stack up to 6 time(s).
*/

export class InTheNight extends LightCone {
    constructor() {
        super("InTheNight", {
            health: 1058,
            attack: 582,
            defense: 463,
        });
    }

    linkCharacter(game: Game, character: Character) {
        this.character = character;
        this.character.stats.critRate += 0.18;
    }

    modifyCharacterStats(game: Game, stats: Stats): Stats {
        return stats;
    }

    modifyAttack(game: Game, player: Character, attack: Attack): Attack {
        let stats = attack.stats.clone();

        if (attack.types.includes(AttackType.Ultimate)) {
            stats.critDamage += 0.12 * Math.floor((stats.speed - 100) / 10);
        }

        attack.stats = stats;

        if (
            attack.types.includes(AttackType.Basic) ||
            attack.types.includes(AttackType.Skill)
        ) {
            attack.addModifier(
                new AttackModifier(
                    AttackModifierType.DamageBoost,
                    Math.min(6, 0.06 * Math.floor((stats.speed - 100) / 10)),
                    "in the night"
                )
            );
        }

        return attack;
    }
}
