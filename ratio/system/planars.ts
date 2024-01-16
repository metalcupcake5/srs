import { Stats } from "./Stats";
import { AttackType } from "./attacks/Attack";

export const planars = {
    sss: {
        name: "Space Sealing Station",
        stats: (stats: Stats) => {
            let newStats = stats.clone();
            let speed = newStats.speed;
            newStats.percentAttack += 0.12 + (speed >= 120 ? 0.12 : 0);
            return newStats;
        },
        damageMult: (stats: Stats, types?: AttackType[]) => {
            return 1;
        },
    },
    glam: {
        name: "Firmament Frontline: Glamoth",
        stats: (stats: Stats) => {
            let newStats = stats.clone();
            newStats.percentAttack += 0.12;
            return newStats;
        },
        damageMult: (stats: Stats, types?: AttackType[]) => {
            let speed = stats.speed;
            return speed >= 135 ? (speed >= 160 ? 0.18 : 0.12) : 0;
        },
    },
    salsotto: {
        name: "Inert Salsotto",
        stats: (stats: Stats) => {
            let newStats = stats.clone();
            newStats.critRate += 0.08;
            return newStats;
        },
        damageMult: (stats: Stats, types?: AttackType[]) => {
            return (types.includes(AttackType.FollowUp) ||
                types.includes(AttackType.Ultimate)) &&
                stats.critRate >= 0.5
                ? 0.15
                : 0;
        },
    },
};
