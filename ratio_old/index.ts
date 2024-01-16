import { Dummy } from "./characters/Dummy";
import { Ratio } from "./characters/Ratio";
import { Enemy } from "./system/Enemy";
import { Game } from "./system/Game";
import { light_cones, resetStacks } from "./system/light_cones";
import { planars } from "./system/planars";

function percentDifference(value, original) {
    return Math.floor(((value - original) / original) * 10000) / 100;
}

const turns = 10;

const results = [];

export let currentPlanar;

/* 
    assumptions
        - level 80
        - 6/10/10/10
        - level 90
        - enemy always has 3 debuffs (personal skill + easy debuffs from pela)
            - 100% chance to launch fua
            - 30% dmg increase
        - both ult triggers are consumed
*/

function lightConeTests() {
    for (const [id, lc] of Object.entries(light_cones)) {
        console.log(lc.name);
        const ratio = new Ratio(lc, {
            percentAttack: 2,
            speed: 2,
            critRate: 7,
            critDamage: 12,
        });
        const game = new Game([
            ratio,
            new Enemy("yeah", 100),
            new Dummy(),
            new Dummy(),
        ]);
        const damage = game.run();
        results.push({
            id: id,
            result: damage,
            // diff: percentDifference(damage, breakfast_damage),
        });
    }

    console.log(results.sort((a, b) => b.result - a.result));
}

function planarTests() {
    for (const [id, planar] of Object.entries(planars)) {
        currentPlanar = planar;
        console.log(planar.name);
        const ratio = new Ratio(light_cones.cruising_100, {
            percentAttack: 2,
            speed: 2,
            critRate: 7,
            critDamage: 12,
        });
        const game = new Game([
            ratio,
            new Enemy("yeah", 100),
            new Dummy(),
            new Dummy(),
        ]);
        const damage = game.run();
        results.push({
            id: id,
            result: damage,
            // diff: percentDifference(damage, breakfast_damage),
        });
    }

    console.log(results.sort((a, b) => b.result - a.result));
}

/* potentially functionally broken */
function bothTests() {
    for (const [planarId, planar] of Object.entries(planars)) {
        currentPlanar = planar;
        for (const [lightConeId, lc] of Object.entries(light_cones)) {
            console.log(lc.name);
            const ratio = new Ratio(lc, {
                percentAttack: 2,
                speed: 2,
                critRate: 7,
                critDamage: 12,
            });
            const game = new Game([
                ratio,
                new Enemy("yeah", 100),
                new Dummy(),
                new Dummy(),
            ]);
            const damage = game.run();
            results.push({
                lc: lightConeId,
                planar: planarId,
                result: damage,
                // diff: percentDifference(damage, breakfast_damage),
            });
            resetStacks();
        }
    }

    console.log(results.sort((a, b) => b.result - a.result));
}

bothTests();
