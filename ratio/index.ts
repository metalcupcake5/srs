import { Dummy } from "./characters/Dummy";
import { Ratio } from "./characters/Ratio";
import { Glamoth } from "./relics/planars/Glamoth";
import { Salsotto } from "./relics/planars/Salsotto";
import { SpaceSealingStation } from "./relics/planars/SpaceSealingStation";
import { Musketeer } from "./relics/relic_sets/Musketeer";
import { Wastelander } from "./relics/relic_sets/Wastelander";
import { Enemy } from "./system/Enemy";
import { Game } from "./system/Game";
import { Attack, AttackType } from "./system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "./system/attacks/AttackModifier";
import { light_cones, resetStacks } from "./system/light_cones";

function percentDifference(value, original) {
    return Math.floor(((value - original) / original) * 10000) / 100;
}

const turns = 10;

const results = [];

/* 
    assumptions
        - level 80
        - 6/10/10/10
        - level 90
        - enemy always has 3 debuffs (personal skill + easy debuffs from pela)
            - 100% chance to launch fua
            - 30% dmg increase
        - both ult triggers are consumed
        - standard dps mainstats
            - cr body
            - spd boots
            - atk rope
    
    not added yet but (probably) wont affect comparison calcs
    - orb mainstat
    - relic set bonuses (planars are implemented)
*/

function lightConeTests() {
    for (const [id, lc] of Object.entries(light_cones)) {
        console.log(lc.name);
        const ratio = new Ratio(
            lc,
            {
                percentAttack: 2,
                speed: 2,
                critRate: 7,
                critDamage: 12,
            },
            [new Glamoth(), new Musketeer(2), new Wastelander(2)]
        );
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
    let planars = [new Glamoth(), new Salsotto(), new SpaceSealingStation()];
    for (const planar of planars) {
        console.log(planar.name);
        const ratio = new Ratio(
            light_cones.cruising_100,
            {
                percentAttack: 2,
                speed: 2,
                critRate: 7,
                critDamage: 12,
            },
            [planar, new Musketeer(2), new Wastelander(2)]
        );
        const game = new Game([
            ratio,
            new Enemy("yeah", 100),
            new Dummy(),
            new Dummy(),
        ]);
        const damage = game.run();
        results.push({
            id: planar.name,
            result: damage,
            // diff: percentDifference(damage, breakfast_damage),
        });
    }

    console.log(results.sort((a, b) => b.result - a.result));
}

/* potentially functionally broken */
function bothTests() {
    let planars = [new Glamoth(), new Salsotto(), new SpaceSealingStation()];
    for (const planar of planars) {
        for (const [lightConeId, lc] of Object.entries(light_cones)) {
            console.log(lc.name);
            const ratio = new Ratio(
                lc,
                {
                    percentAttack: 2,
                    speed: 2,
                    critRate: 7,
                    critDamage: 12,
                },
                [planar, new Musketeer(2), new Wastelander(2)]
            );
            const game = new Game([
                ratio,
                new Enemy("yeah", 100),
                new Dummy(),
                new Dummy(),
            ]);
            const damage = game.run();
            results.push({
                lc: lightConeId,
                planar: planar.name,
                result: damage,
                // diff: percentDifference(damage, breakfast_damage),
            });
            resetStacks();
        }
    }

    console.log(results.sort((a, b) => b.result - a.result));
}

// bothTests();
planarTests();
