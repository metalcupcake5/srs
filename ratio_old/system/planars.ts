import { Stats } from "./Stats";

export const planars = {
    sss: {
        name: "Space Sealing Station",
        stats: (stats: Stats) => {
            let speed = stats.speed;
            stats.percentAttack += 0.12 + (speed >= 120 ? 0.12 : 0);
            return stats;
        },
        damageMult: (stats: Stats, type?: string) => {
            return 1;
        },
    },
    glam: {
        name: "Firmament Frontline: Glamoth",
        stats: (stats: Stats) => {
            stats.percentAttack += 0.12;
            return stats;
        },
        damageMult: (stats: Stats, type?: string) => {
            let speed = stats.speed;
            return speed >= 135 ? (speed >= 160 ? 1.18 : 1.12) : 1;
        },
    },
    salsotto: {
        name: "Inert Salsotto",
        stats: (stats: Stats) => {
            stats.critRate += 0.08;
            return stats;
        },
        damageMult: (stats: Stats, type?: string) => {
            return (type == "followup" || type == "ult") &&
                stats.critRate >= 0.5
                ? 1.15
                : 1;
        },
    },
};
