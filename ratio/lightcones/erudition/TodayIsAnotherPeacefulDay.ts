import { Character } from "../../system/Character";
import { Game } from "../../system/Game";
import { LightCone } from "../../system/LightCone";
import { Stats } from "../../system/Stats";
import { Attack } from "../../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../../system/attacks/AttackModifier";

export class TodayIsAnotherPeacefulDay extends LightCone {
    constructor() {
        super("Today Is Another Peaceful Day", {
            health: 847,
            attack: 529,
            defense: 331,
        });
    }

    linkCharacter(character: Character) {
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
                0.002 * Math.min(160, player.stats.maxEnergy),
                "peaceful day"
            )
        );

        return attack;
    }
}
