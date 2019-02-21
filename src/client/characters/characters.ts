import { CharacterDefs, ImmutableCharacterDefs } from "@typings/character";
import Abilities from "./Abilities";

const characters: CharacterDefs = [
	{
		name: "Boop",
		color: "red",
		hp: 20,
		armor: -4,
		evasion: 14,
		movement: 4,
		weapon: {
			dmg: { sides: 10 },
			hit: 3,
		},
		abilities: [
			Abilities.wideSwipe,
			Abilities.shieldBash,
			Abilities.decisiveStrike,
		],
	},
	{
		name: "Bow",
		color: "orange",
		hp: 16,
		armor: -2,
		evasion: 16,
		movement: 5,
		weapon: {
			dmg: { sides: 10 },
			hit: 3,
			range: 8,
		},
		hand: {
			dmg: { sides: 6 },
			hit: 3,
		},
		abilities: [
			Abilities.legShot,
			Abilities.skirmisher,
			Abilities.multishot,
		],
	},
	{
		name: "Boom",
		color: "yellow",
		hp: 13,
		armor: 0,
		evasion: 12,
		movement: 4,
		weapon: {
			dmg: { sides: 6 },
			hit: 1,
		},
		abilities: [
			Abilities.flameShield,
			Abilities.rayOfImmolation,
			Abilities.tar,
		],
	},
	{
		name: "Boob",
		color: "lime",
		hp: 15,
		armor: -2,
		evasion: 12,
		movement: 4,
		weapon: {
			dmg: { sides: 8 },
			hit: 1,
		},
		abilities: [
			Abilities.bigAttack,
			Abilities.regenerativeAura,
			Abilities.earthquake,
		],
	},
	{
		name: "Booger",
		color: "cyan",
		hp: 18,
		armor: -3,
		evasion: 13,
		movement: 5,
		hand: {
			dmg: { sides: 8 },
			hit: 2,
			range: 2,
		},
		weapon: {
			dmg: { sides: 6 },
			hit: 2,
			range: 3,
		},
		abilities: [
			Abilities.trip,
			Abilities.defensiveStance,
			Abilities.charge,
		],
	},
	{
		name: "Bog",
		color: "blue",
		hp: 15,
		armor: -1,
		evasion: 12,
		movement: 4,
		weapon: {
			dmg: { sides: 6 },
			hit: 1,
		},
		abilities: [
			Abilities.poisonSpray,
			Abilities.heal,
			Abilities.graspingVines,
		],
	},
	{
		name: "Boot",
		color: "indigo",
		hp: 16,
		armor: -1,
		evasion: 18,
		movement: 5,
		hand: {
			dmg: { sides: 6 },
			hit: 3,
		},
		weapon: {
			dmg: { sides: 6 },
			hit: 3,
			range: 3,
		},
		abilities: [
			Abilities.pin,
			Abilities.wallRun,
			Abilities.precisionStab,
		],
	},
	{
		name: "Boar",
		color: "violet",
		hp: 25,
		armor: -5,
		evasion: 14,
		movement: 3,
		weapon: {
			dmg: { sides: 8 },
			hit: 2,
		},
		abilities: [
			Abilities.pull,
			Abilities.throwAlly,
			Abilities.scrap,
		],
	},
];

export default Immutable.fromJS(characters) as ImmutableCharacterDefs;
