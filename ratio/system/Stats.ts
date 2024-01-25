export interface Rolls {
    flatHealth?: number;
    flatAttack?: number;
    flatDefense?: number;
    percentHealth?: number;
    percentAttack?: number;
    percentDefense?: number;
    speed?: number;
    breakEffect?: number;
    effectHitRate?: number;
    effectRes?: number;
    critDamage?: number;
    critRate?: number;
}

const subValues = {
    flatHealth: 38.103755,
    flatAttack: 19.051877,
    flatDefense: 19.051877,
    percentHealth: 0.03888,
    percentAttack: 0.03888,
    percentDefense: 0.0486,
    speed: 2.3,
    breakEffect: 5.832,
    effectHitRate: 3.888,
    effectRes: 3.888,
    critDamage: 0.05832,
    critRate: 0.02916,
};

export class Stats {
    baseHealth: number;
    baseDefense: number;
    baseAttack: number;
    flatHealth: number = 0;
    flatDefense: number = 0;
    flatAttack: number = 0;
    percentHealth: number = 0;
    percentDefense: number = 0;
    percentAttack: number = 0;
    critDamage: number = 0.5;
    critRate: number = 0.05;
    speed: number;
    maxEnergy: number;
    breakEffect: number = 0;
    effectHitRate: number = 0;
    energyRegenerationRate: number = 0;
    effectRes: number = 0;

    constructor(
        {
            health = 100,
            defense = 0,
            attack = 100,
            speed = 100,
            maxEnergy = 100,
        },
        subs: Rolls = {}
    ) {
        this.baseHealth = health;
        this.baseDefense = defense;
        this.baseAttack = attack;
        this.speed = speed;
        this.maxEnergy = maxEnergy;

        // TODO replace with check for type of character

        //standard dps mainstats
        this.flatAttack += 352.8; // hands
        this.flatHealth += 705.6; // head
        //this.critDamage += 0.648; // body
        this.critRate += 0.324; // body
        this.speed += 25.032; // boots
        this.percentAttack += 0.432; // rope
        // planar has damage boost

        if (Object.values(subs).reduce((s, e) => s + e, 0) > 24) {
            throw new Error("sub count cannot exceed 24");
        }

        if (!Object.values(subs).every((e) => e <= 12)) {
            throw new Error("subs are capped at 12");
        }

        for (const [name, value] of Object.entries(subValues)) {
            this[name] += value * (2 + (subs[name] ?? 0));
            // if (subs[name]) {
            //     console.log(
            //         `added ${
            //             2 + (subs[name] ?? 0)
            //         } ${name} subs for a total of ${this[name]}`
            //     );
            // }
        }

        // for (const [name, value] of Object.entries(subs)) {
        //     if (name.includes("flat")) continue;
        //     this[name] += value * subValues[name];
        //     console.log(`added ${value * subValues[name]} to ${name}`);
        // }
    }

    totalAttack(): number {
        return (
            this.baseAttack +
            this.baseAttack * this.percentAttack +
            this.flatAttack
        );
    }

    totalHealth(): number {
        return (
            this.baseHealth +
            this.baseHealth * this.percentHealth +
            this.flatHealth
        );
    }

    clone(): Stats {
        let newStats = new Stats({});
        newStats.baseHealth = this.baseHealth;
        newStats.baseDefense = this.baseDefense;
        newStats.baseAttack = this.baseAttack;
        newStats.flatHealth = this.flatHealth;
        newStats.flatDefense = this.flatDefense;
        newStats.flatAttack = this.flatAttack;
        newStats.percentHealth = this.percentHealth;
        newStats.percentDefense = this.percentDefense;
        newStats.percentAttack = this.percentAttack;
        newStats.critDamage = this.critDamage;
        newStats.critRate = this.critRate;
        newStats.speed = this.speed;
        newStats.maxEnergy = this.maxEnergy;
        newStats.breakEffect = this.breakEffect;
        newStats.effectHitRate = this.effectHitRate;
        newStats.effectRes = this.effectRes;
        newStats.energyRegenerationRate = this.energyRegenerationRate;
        return newStats;
    }
}
