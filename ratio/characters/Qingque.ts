import { HiddenHand } from "../effects/buffs/HiddenHand";
import { QingqueDamageBoost } from "../effects/buffs/QingqueDamageBoost";
import { Action, ActionType } from "../system/Action";
import { Character, Element } from "../system/Character";
import { Game } from "../system/Game";
import { LightCone } from "../system/LightCone";
import { RelicSet } from "../system/RelicSet";
import { type Rolls, Stats } from "../system/Stats";
import { Attack, AttackType } from "../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../system/attacks/AttackModifier";
import { EffectAttribute } from "../system/effects/Effect";

// assumption: qq always draws 3 tiles before enhanced basic

export class Qingque extends Character {
    ultDamage: number = 0;
    basicDamage: number = 0;
    turns: number = 0;
    lightCone: LightCone;
    relicSets: RelicSet[];
    hiddenHand: boolean = false;

    constructor(
        lightCone: LightCone,
        substats: Rolls,
        relicSets: RelicSet[] = []
    ) {
        const stats = new Stats(
            {
                health: 1023,
                defense: 441,
                attack: 653,
                speed: 98,
                maxEnergy: 140,
            },
            true,
            substats
        );
        // sub traces
        stats.percentAttack += 0.28;
        stats.quantumDamageBoost += 0.144;
        stats.percentDefense += 0.125;

        stats.addDpsCharacterMainstats(Element.Quantum, true, false);

        super("Qingque", stats, Element.Quantum);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
        lightCone.linkCharacter(this);
    }

    act(game: Game): void {
        this.turns++;

        let skillCount = 0;

        for (let i = 0; i < 3; i++) {
            if (game.skillPoints <= 0) {
                break;
            }
            this.skill(game);
            skillCount++;
        }

        if (skillCount >= 3) {
            this.hiddenHand = true;
            this.addEffect(new HiddenHand(this));
        }

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }

        this.basic(game);
    }

    basic(game: Game) {
        let buffedStats = this.preAttackStats(game);

        let target = game.getRandomEnemy();

        // level 6
        let attack = new Attack(
            this.element,
            buffedStats,
            this.hiddenHand
                ? (atk) => {
                      return atk * (2.4 + 1 + 1); // 3 enemies
                  }
                : (atk) => {
                      return atk;
                  },
            [AttackType.Basic],
            target
        );

        if (!this.hiddenHand) {
            game.addSkillPoint(this);
        }

        attack = this.preAttackModifiers(game, attack);

        target.modifyAttack(game, attack);

        let damage = attack.calcDamage();

        this.hiddenHand = false;

        this.basicDamage += damage;
        this.regenerateEnergy(20);
        game.actions.push(new Action(game, this, ActionType.Basic, attack));
    }

    skill(game: Game) {
        game.useSkillPoint(this);
        game.actions.push(new Action(game, this, ActionType.Skill));
        let filteredEffects = this.effects.filter(
            (e) => e instanceof QingqueDamageBoost
        );
        if (filteredEffects.length > 0) {
            (filteredEffects[0] as QingqueDamageBoost).addStack();
            return;
        }
        this.addEffect(new QingqueDamageBoost(this));
    }

    ult(game?: Game) {
        let buffedStats = this.preAttackStats(game);

        let target = game.getRandomEnemy();

        // level 6
        let attack = new Attack(
            this.element,
            buffedStats,
            (atk) => {
                return atk * 2 * 3; // 3 enemies
            },
            [AttackType.Ultimate],
            target
        );

        attack = this.preAttackModifiers(game, attack);

        target.modifyAttack(game, attack);

        let damage = attack.calcDamage();

        this.ultDamage += damage;
        game.actions.push(new Action(game, this, ActionType.Ultimate, attack));
        this.currentEnergy = 0;
        this.regenerateEnergy(5);

        let filteredEffects = this.effects.filter(
            (e) => e instanceof HiddenHand
        );
        if (filteredEffects.length <= 0) {
            this.addEffect(new HiddenHand(this));
        }
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

        attack.addModifier(
            new AttackModifier(
                AttackModifierType.Resistance,
                0.2,
                "non-quantum resistance"
            )
        ); // res

        return attack;
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        let total = this.basicDamage + this.ultDamage;
        console.log(
            `total damage by qq: ${total} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(total / this.turns)}`
        );
        return total;
    }

    getTotalDamage() {
        let total = this.basicDamage + this.ultDamage;
        return {
            total: total,
            basic: this.basicDamage,
            ult: this.ultDamage,
        };
    }
}
