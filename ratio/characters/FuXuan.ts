import { MatrixOfPrescienceEffect } from "../effects/buffs/MatrixOfPrescienceEffect";
import { Action, ActionType } from "../system/Action";
import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { type Rolls, Stats } from "../system/Stats";

export class FuXuan extends Character {
    matrixTurns = 0;
    matrixEffect = new MatrixOfPrescienceEffect(this);

    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = [],
        game: Game
    ) {
        const stats = new Stats(
            {
                health: 1475,
                defense: 606,
                attack: 466,
                speed: 100,
                maxEnergy: 135,
            },
            true,
            substats
        );
        // sub traces
        stats.critRate += 0.187;
        stats.percentHealth += 0.18;
        stats.effectRes += 0.1;

        stats.addSupportCharacterMainstats();

        super("Fu Xuan", stats, Element.Quantum);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
        lightCone.linkCharacter(this);
    }

    setup(game: Game): void {
        this.matrixEffect.resetDuration(); // technique
        for (let char of game.characters) {
            char.addEffect(this.matrixEffect);
        }

        for (let set of this.relicSets) {
            set.setup(game);
        }
    }

    act(game: Game): void {
        this.turns++;

        const target = game.getRandomEnemy();

        if (this.matrixEffect.duration < 1) {
            this.skill(game);
            return;
        }

        this.basic(game);

        // if (this.currentEnergy >= this.stats.maxEnergy) {
        //     this.ult(game);
        // }
    }

    basic(game: Game) {
        game.addSkillPoint(this);
        game.actions.push(new Action(game, this, ActionType.Basic));
    }

    skill(game: Game) {
        this.matrixEffect.resetDuration();
        for (let char of game.characters) {
            if (!char.effects.includes(this.matrixEffect)) {
                char.addEffect(this.matrixEffect);
            }
        }
        this.regenerateEnergy(50);
        game.useSkillPoint(this);
        game.actions.push(new Action(game, this, ActionType.Skill));
    }

    ult(game?: Game) {
        this.regenerateEnergy(5);
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by fx: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
