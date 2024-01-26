import { Dummy } from "./characters/Dummy";
import { FuXuan } from "./characters/FuXuan";
import { Enemy } from "./system/Enemy";
import { Game } from "./system/Game";
import { SheAlreadyShutHerEyes } from "./lightcones/preservation/SheAlreadyShutHerEyes";
import { Ratio } from "./characters/Ratio";
import { BaptismOfPureThought } from "./lightcones/hunt/BaptismOfPureThought";

function percentDifference(value, original) {
    return Math.floor(((value - original) / original) * 10000) / 100;
}

const turns = 10;

const results = [];

/* old tests with old system
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
    let planars = [
        new Glamoth(),
        new Salsotto(),
        new SpaceSealingStation(),
        new Rutilant(),
    ];
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

*/

const fx = new FuXuan(new SheAlreadyShutHerEyes(), {
    percentAttack: 2,
    speed: 2,
    critRate: 7,
    critDamage: 12,
});

const ratio = new Ratio(new BaptismOfPureThought(), {
    percentAttack: 2,
    speed: 2,
    critRate: 7,
    critDamage: 12,
});

const game = new Game([fx, new Enemy("yeah", 100), new Dummy(), new Dummy()]);
