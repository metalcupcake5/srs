import { Player } from "../Player";
import { Stats } from "../Stats";
import { AttackModifier, AttackModifierType } from "./AttackModifier";

/**
 * defense reduction formula
 * @param reduction % def reduction
 */
function defReductionFormula({
    defenderLevel = 90,
    attackerLevel = 80,
    reduction = 0,
}) {
    return (
        (attackerLevel + 20) /
        ((defenderLevel + 20) * (1 - reduction) + (attackerLevel + 20))
    );
}

function crit(damage, critRate, critDamage) {
    return Math.floor(
        damage * (1 + critDamage) * critRate + damage * (1 - critRate)
    );
}

export enum AttackType {
    Basic,
    Skill,
    Ultimate,
    FollowUp,
}

type DamageFunction = (attack: number) => number;

export class Attack {
    modifiers: AttackModifier[];
    stats: Stats;
    types: AttackType[];
    multiplierFunction: (attack: number) => number;
    target: Player;

    constructor(
        attackerStats: Stats,
        multiplierFunction: DamageFunction,
        types: AttackType[],
        target: Player,
        modifiers = []
    ) {
        this.modifiers = modifiers;
        this.stats = attackerStats;
        this.types = types;
        this.multiplierFunction = multiplierFunction;
        this.target = target;
    }

    addModifier(mod: AttackModifier) {
        this.modifiers.push(mod);
    }

    getModifierTotal(type: AttackModifierType) {
        return this.modifiers
            .filter((mod) => mod.type == type)
            .reduce(
                (accumulator, current) => (accumulator += current.value),
                0
            );
    }

    calcDamage() {
        // console.log(this.modifiers);
        let base = this.multiplierFunction(this.stats.totalAttack());
        let damageBoost =
            1 + this.getModifierTotal(AttackModifierType.DamageBoost);
        let weakenMod = 1 - this.getModifierTotal(AttackModifierType.Weaken);
        let defMultiplier = defReductionFormula({
            reduction: this.getModifierTotal(AttackModifierType.DefenseDown),
        });
        let resMultiplier =
            1 + this.getModifierTotal(AttackModifierType.ResistanceReduction);
        let vulnMultiplier =
            1 + this.getModifierTotal(AttackModifierType.Vulnerability);
        let dmgReductionMultiplier = this.modifiers
            .filter((mod) => mod.type == AttackModifierType.DamageReduction)
            .reduce(
                (accumulator, current) => (accumulator *= 1 - current.value),
                1
            );

        let finalDamage =
            base *
            damageBoost *
            weakenMod *
            defMultiplier *
            resMultiplier *
            vulnMultiplier *
            dmgReductionMultiplier;

        // console.log(`damage: ${this.stats.critDamage}`);

        return crit(finalDamage, this.stats.critRate, this.stats.critDamage);
    }
}
