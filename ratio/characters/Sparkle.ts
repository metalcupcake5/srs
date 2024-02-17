import { SparkleCritDamageBoost } from "../effects/buffs/SparkleCritDamageBoost";
import { Action, ActionType } from "../system/Action";
import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { type Rolls, Stats } from "../system/Stats";
import { Attack } from "../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../system/attacks/AttackModifier";
import { EffectAttribute } from "../system/effects/Effect";

// TODO subscribe to skill point event

export class Sparkle extends Character {
    totalDamage: number = 0;
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
        stats.percentHealth += 0.28;
        stats.critDamage += 0.24;
        stats.effectRes += 0.1;

        stats.energyRegenerationRate += 0.19439401499999998; // er rope

        super("Sparkle", stats, Element.Quantum);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
        lightCone.linkCharacter(this);

        game.maxSkillPoints += 2;
        game.skillPoints += 3; // technique

        // eventEmitter.on("skillPointUse", (game: Game) => {
        //     this.talent(game);
        // });
    }

    act(game: Game): void {
        this.turns++;

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }

        if (game.skillPoints < 1) {
            return this.basic(game);
        }

        this.skill(game);
    }

    basic(game: Game) {
        game.addSkillPoint();
        this.regenerateEnergy(30); // a6 10 more energy on basic (20 + 10)
        game.actions.push(new Action(game, this, ActionType.Basic));
    }

    skill(game: Game) {
        let targetChar = game.characters.sort(
            (a, b) => b.stats.totalAttack() - a.stats.totalAttack()
        )[0];
        targetChar.advanceForward(0.5);
        targetChar.addEffect(
            new SparkleCritDamageBoost(
                targetChar,
                this.stats.critDamage * 0.24 + 0.45
            )
        );

        game.useSkillPoint();
        this.regenerateEnergy(30);
        game.actions.push(new Action(game, this, ActionType.Skill));
    }

    ult(game: Game) {
        this.currentEnergy = 0;
        game.addSkillPoint();
        game.addSkillPoint();
        game.addSkillPoint();
        game.addSkillPoint();
        this.regenerateEnergy(5);
        game.actions.push(new Action(game, this, ActionType.Ultimate));
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

        attack.addModifier(
            new AttackModifier(
                AttackModifierType.DamageBoost,
                this.stats[`${this.element}DamageBoost`],
                "stat damage boost"
            )
        );

        return attack;
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by sparkle: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
