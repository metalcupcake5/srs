import { eventEmitter } from "..";
import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { Rolls, Stats } from "../system/Stats";
import { Attack } from "../system/attacks/Attack";
import { EffectAttribute } from "../system/effects/Effect";

export class Sparkle extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    turns: number = 0;
    lightCone: LightCone;
    relicSets: RelicSet[];

    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = [],
        game: Game
    ) {
        const stats = new Stats(
            {
                health: 1397,
                defense: 485,
                attack: 524,
                speed: 101,
                maxEnergy: 110,
            },
            substats
        );
        // sub traces
        stats.percentAttack += 0.28;
        stats.quantumDamageBoost += 0.144;
        stats.percentDefense += 0.125;

        super("Qingque", stats);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
        lightCone.linkCharacter(this);

        game.maxSkillPoints += 2;

        eventEmitter.on("skillPointUse", (game: Game) => {
            this.talent(game);
        });
    }

    act(game: Game): void {
        this.turns++;

        for (let i = 0; i < 3; i++) {
            if (game.skillPoints <= 0) {
                break;
            }
            this.skill(game);
        }

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }

        this.basic(game);
    }

    basic(game: Game) {
        this.currentEnergy += 20;
    }

    skill(game: Game) {
        game.useSkillPoint();
    }

    ult(game?: Game) {
        this.currentEnergy = 5;
    }

    talent(game?: Game) {
        // Whenever an ally consumes 1 Skill Point, all allies' DMG increases by 6%. 
        // This effect lasts for 2 turn(s) and can stack up to 3 time(s).
    }

    preAttackStats(game: Game): Stats {
        let buffedStats = this.stats.clone();

        for (const set of this.relicSets) {
            buffedStats = set.modifyStats(buffedStats);
        }

        buffedStats = this.lightCone.modifyCharacterStats(game, buffedStats);

        for (const effect of this.effects) {
            if (effect.attributes.includes(EffectAttribute.Stat)) {
                buffedStats = effect.modifyStats(buffedStats);
            }
        }
        return buffedStats;
    }

    preAttackModifiers(game: Game, attack: Attack): Attack {
        for (const set of this.relicSets) {
            attack = set.modifyAttack(attack);
        }

        attack = this.lightCone.modifyAttack(game, this, attack);

        for (const effect of this.effects) {
            if (effect.attributes.includes(EffectAttribute.AttackModifier)) {
                attack = effect.modifyAttack(attack);
            }
        }

        return attack;
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by seele: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
