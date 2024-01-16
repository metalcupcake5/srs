import { Character } from "./Character";
import { Stats } from "./Stats";

function crit(damage, critRate, critDamage) {
    return Math.floor(
        damage * (1 + critDamage) * critRate + damage * (1 - critRate)
    );
}

const aeon_stacks = 0;

type DamageFunction = (attack: number) => number;

export const light_cones = {
    secret_vow_100: {
        name: "A Secret Vow (100% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.baseDefense += 265;
            stats.baseAttack += 476;
            return stats;
        },
        skill: (data: { damage?: DamageFunction; stats?: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * 1.4;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * 1.4;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
    secret_vow_50: {
        name: "A Secret Vow (50% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.baseDefense += 265;
            stats.baseAttack += 476;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * 1.3;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * 1.3;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
    unreachable_side: {
        name: "The Unreachable Side",
        character: (stats, data) => {
            stats.baseHealth += 1270;
            stats.baseDefense += 331;
            stats.baseAttack += 582;
            stats.critRate += 0.18;
            stats.percentHealth += 0.18;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk) * 1.24;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk = data.stats.totalAttack();
            const damage = data.damage(atk);
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
    aeon_0: {
        name: "On the Fall of an Aeon (S5, 0% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.baseDefense += 397;
            stats.baseAttack += 529;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk =
                data.stats.baseAttack +
                data.stats.baseAttack *
                    (data.stats.percentAttack + aeon_stacks * 0.16) +
                data.stats.flatAttack;
            const damage = data.damage(atk);
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk =
                data.stats.baseAttack +
                data.stats.baseAttack *
                    (data.stats.percentAttack + aeon_stacks * 0.16) +
                data.stats.flatAttack;
            const damage = data.damage(atk);
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
    aeon_50: {
        name: "On the Fall of an Aeon (S5, 0% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.baseDefense += 397;
            stats.baseAttack += 529;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk =
                data.stats.baseAttack +
                data.stats.baseAttack *
                    (data.stats.percentAttack + aeon_stacks * 0.16) +
                data.stats.flatAttack;
            const damage = data.damage(atk) * 1.12;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk =
                data.stats.baseAttack +
                data.stats.baseAttack *
                    (data.stats.percentAttack + aeon_stacks * 0.16) +
                data.stats.flatAttack;
            const damage = data.damage(atk) * 1.12;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
    aeon_100: {
        name: "On the Fall of an Aeon (S5, 0% uptime)",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.baseDefense += 397;
            stats.baseAttack += 529;
            return stats;
        },
        skill: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk =
                data.stats.baseAttack +
                data.stats.baseAttack *
                    (data.stats.percentAttack + aeon_stacks * 0.16) +
                data.stats.flatAttack;

            const damage = data.damage(atk) * 1.24;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
        ult: (data: { damage: DamageFunction; stats: Stats }) => {
            const atk =
                data.stats.baseAttack +
                data.stats.baseAttack *
                    (data.stats.percentAttack + aeon_stacks * 0.16) +
                data.stats.flatAttack;
            const damage = data.damage(atk) * 1.24;
            return crit(damage, data.stats.critRate, data.stats.critDamage);
        },
    },
};
