import { Character } from "./Character";

export const light_cones = {
    breakfast_s5: {
        name: "Breakfast S5 (full stacks)",
        character: (stats, data) => {
            stats.baseHealth += 846;
            stats.defense += 397;
            stats.attack += 476;
            stats.attack *= 1 + 0.08 * 3;
            console.log(stats.critDamage);
            return stats;
        },
        skill: (damage, data) => {
            return damage * 1.24;
        },
        ult: (damage, data) => {
            return damage * 1.24;
        },
    },
    breakfast_s1: {
        name: "Breakfast S1",
        character: (stats, data) => {
            stats.baseHealth += 846;
            stats.defense += 397;
            stats.attack += 476;
            stats.attack *= 1 + 0.04 * 3;
            return stats;
        },
        skill: (damage, data) => {
            return damage * 1.12;
        },
        ult: (damage, data) => {
            return damage * 1.12;
        },
    },
    argenti_signature: {
        name: "An Instant Before A Gaze S1 (signature)",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.defense += 463;
            stats.attack += 582;
            stats.critDamage += 0.36;
            return stats;
        },
        skill: (damage, data) => {
            return damage;
        },
        ult: (damage, data) => {
            return damage * (1 + (180 * 0.36) / 100);
        },
    },
    clamor: {
        name: "Make the World Clamor",
        character: (stats, data) => {
            stats.baseHealth += 846;
            stats.defense += 396;
            stats.attack += 476;
            return stats;
        },
        skill: (damage, data) => {
            return damage;
        },
        ult: (damage, data) => {
            return damage * 1.32;
        },
    },
    dawn: {
        name: "Before Dawn S1",
        character: (stats, data) => {
            stats.baseHealth += 1058;
            stats.defense += 463;
            stats.attack += 582;
            stats.critDamage += 0.36;

            console.log(stats.critDamage);
            return stats;
        },
        skill: (damage, data) => {
            return damage * 1.18;
        },
        ult: (damage, data) => {
            return damage * 1.18;
        },
    },
    // milky_way_3_enemy: {
    //     name: "Night on the Milky Way S1 (3 enemies)",
    //     character: (stats, data) => {
    //         stats.baseHealth += 1164;
    //         stats.defense += 397;
    //         stats.attack += 582;
    //         stats.attack += stats.attack * 0.09 * 3;
    //         return stats;
    //     },
    //     skill: (damage, data) => {
    //         return damage;
    //     },
    //     ult: (damage, data) => {
    //         return damage;
    //     },
    // },
    peaceful_day: {
        name: "Today Is Another Peaceful Day",
        character: (stats, data) => {
            stats.baseHealth += 847;
            stats.defense += 331;
            stats.attack += 529;
            return stats;
        },
        skill: (damage, data) => {
            return damage * (1 + 0.002 * Math.min(160, data.stats.maxEnergy));
        },
        ult: (damage, data) => {
            return damage * (1 + 0.002 * Math.min(160, data.stats.maxEnergy));
        },
    },
    // milky_way_5_enemy: {
    //     name: "Night on the Milky Way S1 (5 enemies)",
    //     character: (stats, data) => {
    //         stats.baseHealth += 1164;
    //         stats.defense += 397;
    //         stats.attack += 582;
    //         stats.attack *= 1 + 0.09 * 5;
    //         console.log(stats.attack);
    //         return stats;
    //     },
    //     skill: (damage, data) => {
    //         return damage;
    //     },
    //     ult: (damage, data) => {
    //         return damage;
    //     },
    // },
};
