import { Element } from "./Character";

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
    effectRes: number = 0;
    energyRegenerationRate: number = 0;
    physicalDamageBoost: number = 0;
    fireDamageBoost: number = 0;
    iceDamageBoost: number = 0;
    lightningDamageBoost: number = 0;
    windDamageBoost: number = 0;
    quantumDamageBoost: number = 0;
    imaginaryDamageBoost: number = 0;

    constructor(
        {
            health = 100,
            defense = 0,
            attack = 100,
            speed = 100,
            maxEnergy = 100,
        },
        isCharacter: boolean,
        subs: Rolls = {}
    ) {
        this.baseHealth = health;
        this.baseDefense = defense;
        this.baseAttack = attack;
        this.speed = speed;
        this.maxEnergy = maxEnergy;

        if (isCharacter) {
            let subcount = Object.values(subs).reduce((s, e) => s + e, 0);
            if (subcount > 24) {
                throw new Error(
                    `sub count cannot exceed 24 (currently at ${subcount})`
                );
            }

            if (!Object.values(subs).every((e) => e <= 12)) {
                throw new Error("subs are capped at 12");
            }

            for (const [name, value] of Object.entries(subValues)) {
                this[name] += value * (2 + (subs[name] ?? 0));
            }
        }
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
        let newStats = new Stats({}, true);
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
        newStats.physicalDamageBoost = this.physicalDamageBoost;
        newStats.fireDamageBoost = this.fireDamageBoost;
        newStats.iceDamageBoost = this.iceDamageBoost;
        newStats.lightningDamageBoost = this.lightningDamageBoost;
        newStats.windDamageBoost = this.windDamageBoost;
        newStats.quantumDamageBoost = this.quantumDamageBoost;
        newStats.imaginaryDamageBoost = this.imaginaryDamageBoost;
        return newStats;
    }

    addDpsCharacterMainstats(
        element: Element,
        critRateBody = true,
        speedBoots = true
    ) {
        // flat mainstats
        this.flatAttack += 352.8; // hands
        this.flatHealth += 705.6; // head

        if (critRateBody) {
            this.critRate += 0.324;
        } else {
            this.critDamage += 0.648;
        }

        if (speedBoots) {
            this.speed += 25.032;
        } else {
            this.percentAttack += 0.432;
        }

        this.percentAttack += 0.432; // rope
        this[`${element}DamageBoost`] += 0.388; // orb
    }

    addSupportCharacterMainstats(errRope = true) {
        // flat mainstats
        this.flatAttack += 352.8; // hands
        this.flatHealth += 705.6; // head

        this.speed += 25.032; // boots

        if (errRope) {
            this.energyRegenerationRate += 0.19439401499999998; // er rope
        }
    }
}
