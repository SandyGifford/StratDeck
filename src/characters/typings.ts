export default interface CharacterDef {
	name: string;
	hp: number;
	armor: number;
	evasion: number;
	movement: number;
	weapon: CharacterWeapon;
	hand?: CharacterWeapon;
	abilities: CharacterAbilities;
}

export interface CharacterWeapon {
	dmg: DiceRoll;
	hit: number;
	range?: number;
}

export interface DiceRoll {
	count?: number;
	sides: DiceSides;
}

export interface CharacterAbility {
	name: string;
	description: string;
	range?: number;
	use?: CharacterAbilityUse;
}

export type CharacterAbilityUse = "action" | "reaction";
export type DiceSides = 4 | 6 | 8 | 10 | 12 | 20;
export type CharacterAbilities = [CharacterAbility, CharacterAbility, CharacterAbility];
