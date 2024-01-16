import { Stats } from "../Stats";

export enum AttackModifierType {
    DamageBoost,
    Weaken,
    DefenseDown,
    ResistanceReduction,
    Vulnerability,
    DamageReduction,
}

export class AttackModifier {
    type: AttackModifierType;
    value: number;

    constructor(type: AttackModifierType, value: number) {
        this.type = type;
        this.value = value;
    }
}
