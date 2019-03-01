import DiceRoll from "@typings/dice";
import Immutalizer from "./immutalizer";

export default interface CharacterState {
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

export type CharacterStates = CharacterState[];

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

export type PlayerCharacterStates = CharacterState[];
export type TablePlayerCharacterStates = TableCharacterState[];

export interface TableCharacterState extends CharacterState {
	x: number;
	y: number;
	maxHP: number;
	movedThisTurn: boolean;
}


/**
 * Immutable interfaces
 */

export type ImmutableCharacterState = Immutalizer<CharacterState>;
export type ImmutableCharacterStates = Immutalizer<CharacterStates>;
export type ImmutableCharacterWeapon = Immutalizer<CharacterWeapon>;
export type ImmutableCharacterAbility = Immutalizer<CharacterAbility>;

export type ImmutablePlayerCharacterStates = Immutalizer<PlayerCharacterStates>;
export type ImmutableTablePlayerCharacterStates = Immutalizer<TablePlayerCharacterStates>;

export type ImmutableTableCharacterState = Immutalizer<TableCharacterState>;
