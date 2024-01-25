import { MatrixOfPrescienceEffect } from "../effects/buffs/MatrixOfPrescienceEffect";
import { Character } from "../system/Character";
import { Game } from "../system/Game";
import { RelicSet } from "../system/RelicSet";
import { Rolls, Stats } from "../system/Stats";
import { Attack, AttackType } from "../system/attacks/Attack";
import {
    AttackModifier,
    AttackModifierType,
} from "../system/attacks/AttackModifier";
import { Effect } from "../system/effects/Effect";

export class FuXuan extends Character {
    totalDamage: number = 0;
    currentEnergy: number = 0;
    turns: number = 0;
    lightCone;
    relicSets: RelicSet[];
    matrixTurns = 0;
    matrixEffect = new MatrixOfPrescienceEffect(this);

    constructor(lightCone, substats: Rolls, relicSets: RelicSet[] = []) {
        const stats = new Stats(
            {
                health: 1475,
                defense: 606,
                attack: 466,
                speed: 100,
                maxEnergy: 135,
            },
            substats
        );
        // sub traces
        stats.critRate += 0.187;
        stats.percentHealth += 0.18;
        stats.effectRes += 0.1;

        // TODO replace with proper light cone implementation

        // she already shut her eyes s1
        stats.baseHealth += 1270;
        stats.baseAttack += 423;
        stats.baseDefense += 529;
        stats.percentHealth += 0.24;
        stats.energyRegenerationRate += 0.12;

        super("Fu Xuan", stats);

        this.lightCone = lightCone;
        this.relicSets = relicSets;
    }

    act(game: Game): void {
        this.turns++;

        const target = game.getRandomEnemy();

        if (!this.matrixEffect || this.matrixEffect.duration < 1) {
            this.skill(game);
        }

        if (this.currentEnergy >= this.stats.maxEnergy) {
            this.ult(game);
        }
    }

    skill(game: Game) {
        for (let char of game.characters) {
            if (char.effects.includes(this.matrixEffect)) {
                console.log(`${char.name} already had effect`);
            }
            if (!char.effects.includes(this.matrixEffect)) {
                char.addEffect(this.matrixEffect);
            }
        }
        this.currentEnergy += 50;
    }

    ult(game?: Game) {
        this.currentEnergy = 5;
    }

    damage(game: Game, damage: number): void {
        throw new Error("Method not implemented.");
    }

    printTotalDamage() {
        console.log(
            `total damage by fx: ${this.totalDamage} in ${
                this.turns
            } turns | dmg/turn: ${Math.floor(this.totalDamage / this.turns)}`
        );
        return this.totalDamage;
    }
}
