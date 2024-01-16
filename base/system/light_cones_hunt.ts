import { Character } from "./Character";
import { Stats } from "./Stats";

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
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage =
                data.damage(atk) *
                (baptism_turns > 0 ? 1.36 : 1) *
                defReductionFormula();
            baptism_turns = Math.max(baptism_turns - 1, 0);
            return crit(
                damage,
                data.stats.critRate,
                data.stats.critDamage + 0.08 * 3
            );
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage =
                data.damage(atk) *
                (baptism_turns > 0 ? 1.36 : 1) *
                defReductionFormula();
            baptism_turns = 2;
            return crit(
                damage,
                data.stats.critRate,
                data.stats.critDamage + 0.08 * 3
            );
        },
        followUp: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            console.log(`baptism atk: ${atk}`);
            const damage =
                data.damage(atk) *
                (baptism_turns > 0 ? 1.36 : 1) *
                defReductionFormula(0.24);
            return crit(
                damage,
                data.stats.critRate,
                data.stats.critDamage + 0.08 * 3
            );
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
            stats.critRate += 0.16;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        followUp: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            console.log(`crusing atk: ${atk}`);
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
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
            stats.critRate += 0.16;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        followUp: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
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
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        followUp: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * defReductionFormula();
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
};
