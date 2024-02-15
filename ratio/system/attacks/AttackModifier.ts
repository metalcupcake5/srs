import { Stats } from "../Stats";

export enum AttackModifierType {
    DamageBoost,
    Weaken,
    DefenseDown,
    Resistance,
    ResistanceReduction,
    Vulnerability,
    DamageReduction,
}

export class AttackModifier {
    type: AttackModifierType;
    value: number;
    tag: string;

    constructor(type: AttackModifierType, value: number, tag: string = "") {
        this.type = type;
        this.value = value;
        this.tag = tag;
    }
}
