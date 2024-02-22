import { Attack } from "../../system/attacks/Attack";
import { Character } from "../../system/Character";
import {
    Effect,
    EffectAttribute,
    EffectType,
    Target,
    TickDownTime,
} from "../../system/effects/Effect";
import { Game } from "../../system/Game";
import { Player } from "../../system/Player";
import { Stats } from "../../system/Stats";

export class Mask extends Effect {
    radiantFlame = 0;

    constructor(game: Game, player: Player) {
        super(
            "Mask",
            4,
            EffectType.Buff,
            [EffectAttribute.Stat],
            Target.Global,
            player,
            TickDownTime.TurnEnd,
            1
        );

        game.eventEmitter.on(
            "skillPointGain",
            (game: Game, character: Character) => {
                if (character == this.owner) {
                    this.radiantFlame++;
                }
                if (this.radiantFlame >= 4) {
                    this.radiantFlame = 0;
                    let effect = this.owner.effects.find(
                        (e) => e instanceof Mask
                    );
                    if (!effect) {
                        effect = new Mask(game, this.owner);

                        for (const c of game.characters) {
                            c.addEffect(effect);
                        }
                    }
                    (effect as Mask).resetDuration();
                }
            }
        );
    }

    modifyStats(stats: Stats): Stats {
        let newStats = stats.clone();
        newStats.critRate += 0.1;
        newStats.critDamage += 0.28;
        return newStats;
    }

    modifyAttack(attack: Attack): Attack {
        return attack;
    }

    resetDuration() {
        this.duration = 4;
    }
}
