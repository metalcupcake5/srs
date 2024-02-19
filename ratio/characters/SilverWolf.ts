import { MatrixOfPrescienceEffect } from "../effects/buffs/MatrixOfPrescienceEffect";
import { SilverWolfUltDefReduction } from "../effects/debuffs/SilverWolfUltDefReduction";
import { WeaknessImplant } from "../effects/debuffs/WeaknessImplant";
import { Action, ActionType } from "../system/Action";
import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { type Rolls, Stats } from "../system/Stats";

export class SilverWolf extends Character {
    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = []
    ) {
        const stats = new Stats(
            {
                health: 1048,
                defense: 461,
                attack: 640,
                speed: 107,
                maxEnergy: 110,
            },
            true,
            substats
        );
        // sub traces
        stats.percentAttack += 0.28;
        stats.effectHitRate += 0.18;
        stats.quantumDamageBoost += 0.08;

        stats.addSupportCharacterMainstats();

        super("Silver Wolf", stats, Element.Quantum);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
        lightCone.linkCharacter(this);
    }

    act(game: Game): void {
        this.turns++;

        const target = game.getRandomEnemy();

        if (
            target.effects.filter((e) => e instanceof WeaknessImplant).length <
                1 &&
            game.skillPoints > 0
        ) {
            this.skill(game);
        } else {
            this.basic(game);
        }

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }
    }

    basic(game: Game) {
        this.regenerateEnergy(20);
        game.addSkillPoint(this);
        game.actions.push(new Action(game, this, ActionType.Basic));
    }

    skill(game: Game) {
        this.regenerateEnergy(30);
        let target = game.getRandomEnemy();
        target.addEffect(new WeaknessImplant(target, Element.Quantum)); // assumed to always implant quantum

        game.useSkillPoint(this);
        game.actions.push(new Action(game, this, ActionType.Skill));
    }

    ult(game?: Game) {
        this.currentEnergy = 0;
        let target = game.getRandomEnemy();
        target.addEffect(new SilverWolfUltDefReduction(target));
        game.actions.push(new Action(game, this, ActionType.Ultimate));
        this.regenerateEnergy(5);
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by sw: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
