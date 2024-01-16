import { Attack, AttackType } from "./attacks/Attack";
import { AttackModifier, AttackModifierType } from "./attacks/AttackModifier";

/**
 * defense reduction formula
 * @param reduction % def reduction
 */
function defReductionFormula(reduction = 0) {
    return (80 + 20) / ((90 + 20) * (1 - reduction) + (80 + 20));
}

function crit(damage, critRate, critDamage) {
    return Math.floor(
        damage * (1 + critDamage) * critRate + damage * (1 - critRate)
    );
}

let baptism_turns = 0;
let worrisome_tame = 0;

export function resetStacks() {
    baptism_turns = 0;
    worrisome_tame = 0;
}

type DamageFunction = (attack: number) => number;

export const light_cones = {
    baptism: {
        // Increases the wearer's CRIT DMG by 20%.
        // For every debuff on the enemy target, the wearer's CRIT DMG dealt against this target increases by 8%, stacking up to 3 times.
        // When using Ultimate to attack the enemy target, the wearer receives the Disputation effect,
        // which increases DMG dealt by 36% and enables their follow-up attacks to ignore 24% of the target's DEF. This effect lasts for 2 turns.
        name: "Baptism of Pure Thought",
        character: (stats, data) => {
            stats.baseHealth += 953;
            stats.baseDefense += 529;
            stats.baseAttack += 582;
            stats.critDamage += 0.2;
            return stats;
        },
        modifyAttack(attack: Attack) {
            let stats = attack.stats.clone();

            stats.critDamage += 0.08 * 3;
            attack.stats = stats;

            if (baptism_turns > 0) {
                attack.addModifier(
                    new AttackModifier(AttackModifierType.DamageBoost, 0.36)
                );
                if (attack.types.includes(AttackType.FollowUp)) {
                    attack.addModifier(
                        new AttackModifier(AttackModifierType.DefenseDown, 0.24)
                    );
                }
            }

            if (attack.types.includes(AttackType.Skill))
                baptism_turns = Math.max(baptism_turns - 1, 0);
            if (attack.types.includes(AttackType.Ultimate)) baptism_turns = 2;

            return attack;
        },
    },
    cruising_100: {
        // Increases the wearer's CRIT rate by 16%
        // and increases their CRIT rate against enemies with HP less than or equal to 50% by an extra 16%.
        // When the wearer defeats an enemy, their ATK is increased by 40% for 2 turn(s).
        name: "Cruising in the Stellar Sea (S5, 100% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 953;
            stats.baseDefense += 463;
            stats.baseAttack += 529;
            stats.percentAttack += 0.4;
            stats.critRate += 0.32;
            return stats;
        },
        modifyAttack(attack: Attack) {
            return attack;
        },
    },
    cruising_50: {
        // Increases the wearer's CRIT rate by 16%
        // and increases their CRIT rate against enemies with HP less than or equal to 50% by an extra 16%.
        // When the wearer defeats an enemy, their ATK is increased by 40% for 2 turn(s).
        name: "Cruising in the Stellar Sea (S5, 50% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 953;
            stats.baseDefense += 463;
            stats.baseAttack += 529;
            stats.percentAttack += 0.2;
            stats.critRate += 0.24;
            return stats;
        },
        modifyAttack(attack: Attack) {
            return attack;
        },
    },
    cruising_0: {
        // Increases the wearer's CRIT rate by 16%
        // and increases their CRIT rate against enemies with HP less than or equal to 50% by an extra 16%.
        // When the wearer defeats an enemy, their ATK is increased by 40% for 2 turn(s).
        name: "Cruising in the Stellar Sea (S5, 0% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 953;
            stats.baseDefense += 463;
            stats.baseAttack += 529;
            stats.critRate += 0.16;
            return stats;
        },
        modifyAttack(attack: Attack) {
            return attack;
        },
    },
    sltd: {
        name: "Sleep Like the Dead",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.baseDefense += 463;
            stats.baseAttack += 582;
            stats.critDamage += 0.3;
            stats.critRate += 0.0721;
            return stats;
        },
        modifyAttack(attack: Attack) {
            return attack;
        },
    },
    only_silence_remains_passive: {
        name: "Only Silence Remains (passive active)",
        character: (stats, data) => {
            stats.baseAttack += 476;
            stats.percentAttack += 0.16;
            stats.critRate += 0.12;
            return stats;
        },
        modifyAttack(attack: Attack) {
            return attack;
        },
    },
    only_silence_remains: {
        name: "Only Silence Remains (passive not active)",
        character: (stats, data) => {
            stats.baseAttack += 476;
            stats.percentAttack += 0.16;
            return stats;
        },
        modifyAttack(attack: Attack) {
            return attack;
        },
    },
    river: {
        name: "River Flows In Spring (100% uptime)",
        character: (stats, data) => {
            stats.baseAttack += 476;
            stats.speed *= 1.08;
            return stats;
        },
        modifyAttack(attack: Attack) {
            let stats = attack.stats.clone();

            attack.stats = stats;

            attack.addModifier(
                new AttackModifier(AttackModifierType.DamageBoost, 0.12)
            );

            return attack;
        },
    },
    worrisome: {
        name: "Worrisome, Blissful",
        character: (stats, data) => {
            stats.baseAttack += 582;
            stats.critRate += 0.18;
            return stats;
        },
        modifyAttack(attack: Attack) {
            let stats = attack.stats.clone();

            stats.critDamage += worrisome_tame * 0.12;

            attack.stats = stats;

            if (attack.types.includes(AttackType.FollowUp)) {
                attack.addModifier(
                    new AttackModifier(AttackModifierType.DamageBoost, 0.3)
                );
            }

            worrisome_tame = Math.min(2, worrisome_tame + 1);

            return attack;
        },
    },
};
