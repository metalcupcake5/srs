import { Dummy } from "./characters/Dummy";
import { FuXuan } from "./characters/FuXuan";
import { Enemy } from "./system/Enemy";
import { Game } from "./system/Game";
import { SheAlreadyShutHerEyes } from "./lightcones/preservation/SheAlreadyShutHerEyes";
import { Ratio } from "./characters/Ratio";
import { BaptismOfPureThought } from "./lightcones/hunt/BaptismOfPureThought";
import { Seele } from "./characters/Seele";
import { InTheNight } from "./lightcones/hunt/InTheNight";
import { Stats } from "./system/Stats";
import { Attack, AttackType } from "./system/attacks/Attack";
import { EventEmitter } from "node:events";
import { Qingque } from "./characters/Qingque";

function percentDifference(value, original) {
    return Math.floor(((value - original) / original) * 10000) / 100;
}

const turns = 10;

const results = [];

export const eventEmitter: EventEmitter = new EventEmitter();

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

const qq = new Qingque(new InTheNight(), {
    percentAttack: 2,
    speed: 2,
    critRate: 7,
    critDamage: 12,
});

const game = new Game([qq, new Enemy("yeah", 100), new Dummy(), new Dummy()]);
game.run();
for (let line of game.actions) {
    console.log(
        `${(Math.floor(line.av * 100) / 100).toFixed(2)} | ${line.name} | ${
            line.action
        } | ${line.damage || "n/a"}`
    );
}
