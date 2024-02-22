import { Character } from "./Character";
import { Game } from "./Game";
import { Stats } from "./Stats";
import { Attack } from "./attacks/Attack";

export abstract class LightCone {
    name: string;
    character?: Character;
    health: number;
    attack: number;
    defense: number;

    constructor(
        name: string,
        stats: {
            health: number;
            attack: number;
            defense: number;
        }
    ) {
        this.name = name;
        this.health = stats.health;
        this.attack = stats.attack;
        this.defense = stats.defense;
    }

    /**
     * Link a character to the light cone and add stats that are always active
     * @param character character to link
     */
    abstract linkCharacter(game: Game, character: Character);

    /**
     * Modify stats based on external variables
     * @param game current game state
     * @param stats stats to modify
     */
    abstract modifyCharacterStats(game: Game, stats: Stats): Stats;

    /**
     * Modify an attack
     * @param game current game state
     * @param player player executing the attack
     * @param attack attack object
     */
    abstract modifyAttack(
        game: Game,
        player: Character,
        attack: Attack
    ): Attack;
}
