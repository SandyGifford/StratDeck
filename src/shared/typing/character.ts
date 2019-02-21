import DiceRoll from "@typings/dice";
import Immutalizer from "./immutalizer";

export default interface CharacterDef {
	name: string;
	hp: number;
	armor: number;
	evasion: number;
	movement: number;
	weapon: CharacterWeapon;
	hand?: CharacterWeapon;
	abilities: CharacterAbilities;
	color: string;
}

export type CharacterDefs = CharacterDef[];

export interface CharacterWeapon {
	dmg: DiceRoll;
	hit: number;
	range?: number;
}

export interface CharacterAbility {
	name: string;
	description: string;
	range?: number;
	use?: CharacterAbilityUse;
}

export type CharacterAbilityUse = "action" | "reaction";
export type CharacterAbilities = [CharacterAbility, CharacterAbility, CharacterAbility];

export type PlayerCharacters = [CharacterDef, CharacterDef, CharacterDef];
export type TablePlayerCharacters = [TableCharacterDef, TableCharacterDef, TableCharacterDef];

export interface TableCharacterDef extends CharacterDef {
	x: number;
	y: number;
	maxHP: number;
}


/**
 * Immutable interfaces
 */

export type ImmutableCharacterDef = Immutalizer<CharacterDef>;
export type ImmutableCharacterDefs = Immutalizer<CharacterDefs>;
export type ImmutableCharacterWeapon = Immutalizer<CharacterWeapon>;
export type ImmutableCharacterAbility = Immutalizer<CharacterAbility>;

export type ImmutablePlayerCharacters = Immutalizer<PlayerCharacters>;
export type ImmutableTablePlayerCharacters = Immutalizer<TablePlayerCharacters>;

export type ImmutableTableCharacterDef = Immutalizer<TableCharacterDef>;
