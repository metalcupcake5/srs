import { Action } from "./Action";
import { Character } from "./Character";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { TickDownTime } from "./effects/Effect";
import EventEmitter from "eventemitter3";

export class Game {
    totalAV: number = 0;
    players: Player[];
    characters: Character[] = [];
    enemies: Enemy[] = [];
    queue: Player[];
    print: boolean = false;
    maxAV = 750;
    skillPoints: number = 3;
    maxSkillPoints: number = 5;
    actions: Action[] = [];
    eventEmitter = new EventEmitter();

    constructor(enemies: Enemy[]) {
        this.players = [...enemies];
        this.queue = [...this.players].sort(
            (a, b) => a.actionValue - b.actionValue
        );

        this.enemies = enemies;
    }

    run() {
        // console.log("setting up characters");
        for (const c of this.characters) {
            c.setup(this);
        }

        // console.log("running");
        while (this.totalAV <= this.maxAV) {
            this.act();
        }
        return;
    }

    act() {
        this.queue = [...this.players].sort(
            (a, b) => a.actionValue - b.actionValue
        );
        // console.log("running next action");
        const actor: Player = this.queue.shift();
        this.totalAV += actor.actionValue;
        for (const c of this.queue) {
            c.actionValue -= actor.actionValue;
        }
        actor.tickDownEffects(this, TickDownTime.TurnStart);
        actor.act(this);
        actor.tickDownEffects(this, TickDownTime.TurnEnd);
        if (this.totalAV > this.maxAV) return;
        actor.resetActionValue();
        this.queue.push(actor);
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

    addSkillPoint(triggeringCharacter: Character) {
        if (this.skillPoints < this.maxSkillPoints) {
            this.eventEmitter.emit("skillPointGain", this, triggeringCharacter);
            this.skillPoints++;
        }
    }

    useSkillPoint(triggeringCharacter: Character) {
        if (this.skillPoints > 0) {
            this.eventEmitter.emit("skillPointUse", this, triggeringCharacter);
            this.skillPoints--;
        }
    }

    addCharacter(character: Character) {
        this.players.push(character);
        this.characters.push(character);
        this.queue = [...this.players].sort(
            (a, b) => a.actionValue - b.actionValue
        );
    }
}
