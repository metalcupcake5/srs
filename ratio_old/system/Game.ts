import { Character } from "./Character";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class Game {
    totalAV: number = 0;
    players: Player[];
    characters: Character[] = [];
    enemies: Enemy[] = [];
    queue: Player[];
    print: boolean = false;
    maxAV = 750;

    constructor(chars: Player[]) {
        this.players = chars;
        this.queue = [...this.players].sort(
            (a, b) => a.actionValue - b.actionValue
        );

        for (const p of this.players) {
            if (p instanceof Character) {
                this.characters.push(p);
            }
            if (p instanceof Enemy) {
                this.enemies.push(p);
            }
        }
    }

    run() {
        // this.printActionValues();
        // console.log(this.totalAV);
        // console.log(this.maxAV);

        while (this.totalAV <= this.maxAV) {
            this.act();
            // this.printActionValues();
        }

        // for (const c of this.characters) {
        //     c.printTotalDamage();
        // }
        return this.characters[0].printTotalDamage();
    }

    act() {
        // console.log("running next action");
        const actor: Player = this.queue.shift();
        this.totalAV += actor.actionValue;
        actor.act(this);
        for (const c of this.queue) {
            c.actionValue -= actor.actionValue;
        }
        if (this.totalAV > this.maxAV) return;
        actor.resetActionValue();
        this.queue.push(actor);
        this.queue = [...this.players].sort(
            (a, b) => a.actionValue - b.actionValue
        );
    }

    getRandomEnemy() {
        return this.enemies[Math.floor(Math.random() * this.enemies.length)];
    }

    log(message: string) {
        if (!this.print) return;
        console.log(message);
    }

    printActionValues() {
        for (const c of this.queue) {
            c.printActionValue();
        }
    }
}
