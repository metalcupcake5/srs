import { Arlan } from "./characters/Arlan";
import { Qingque } from "./characters/Qingque";
import { Ratio } from "./characters/Ratio";
import { Enemy } from "./system/Enemy";
import { Game } from "./system/Game";
import { light_cones } from "./system/light_cones_hunt";

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
*/

for (const [id, lc] of Object.entries(light_cones)) {
    if (id == "breakfast_s5") continue;
    console.log(lc.name);
    const ratio = new Ratio(lc, {
        percentAttack: 2,
        speed: 2,
        critRate: 7,
        critDamage: 12,
    });
    const game = new Game([ratio, new Enemy("yeah", 100)]);
    const damage = game.run();
    results.push({
        id: id,
        result: damage,
        // diff: percentDifference(damage, breakfast_damage),
    });
}

console.log(results.sort((a, b) => b.result - a.result));
