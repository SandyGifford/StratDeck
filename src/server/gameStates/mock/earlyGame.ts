import * as Immutable from "immutable";

import GameState, { ImmutableGameState } from "@typings/game";

const initialGameState = (playerCount: number): GameState => ({
	"players": [
		{
			"chars": [
				{
					"color": "red",
					"evasion": 14,
					"hp": 20,
					"abilities": [
						{
							"name": "Wide Swipe",
							"description": "using a melee slashing or bludgeoning weapon without reach, the unit makes a melee attack against every creature in range within a 180° arc."
						},
						{
							"name": "Shield Bash",
							"description": "this unit attacks target with their shield, a weapon that deals 1d6 bludgeoning damage with +3 to hit.On hit, the target falls prone.Unit has + 1 armor until the beginning of next turn."
						},
						{
							"name": "Decisive Strike",
							"description": "Make a melee attack with +3 to attack and damage.On hit, if the target has - 2 armor or less, add an additional 1d4 points of damage of the weapon’s damage type."
						}
					],
					"name": "Boop",
					"maxHP": 20,
					"movedThisTurn": false,
					"movement": 4,
					"x": 0,
					"y": 0,
					"weapon": {
						"dmg": {
							"sides": 10
						},
						"hit": 3
					},
					"armor": -4
				},
				{
					"color": "orange",
					"evasion": 16,
					"hp": 16,
					"abilities": [
						{
							"name": "Leg Shot",
							"description": "Description: make a ranged attack.On hit, the damage of this attack is reduced by half and the target’s movement is reduced to zero for one turn.",
							"range": 4
						},
						{
							"name": "Skirmisher",
							"description": "As a reaction, make one movement out of turn using leftover movement from the previous turn.",
							"use": "reaction"
						},
						{
							"name": "Multishot",
							"description": "make 3 ranged attacks.These can be aimed at the same target or different targets.",
							"range": 8
						}
					],
					"name": "Bow",
					"maxHP": 16,
					"movedThisTurn": false,
					"hand": {
						"dmg": {
							"sides": 6
						},
						"hit": 3
					},
					"movement": 5,
					"x": 0,
					"y": 1,
					"weapon": {
						"dmg": {
							"sides": 10
						},
						"hit": 3,
						"range": 8
					},
					"armor": -2
				},
				{
					"color": "yellow",
					"evasion": 12,
					"hp": 13,
					"abilities": [
						{
							"name": "Flame Shield",
							"description": "until the end of next turn, this unit is surrounded by a ring of flames that deals 1d6 fire damage to adjacent units.This damage is dealt to any units that are adjacent when the ability is first activated and to any units that move adjacent to this unit.",
							"range": 4
						},
						{
							"name": "Ray of Immolation",
							"description": "a fiery beam burns a 2” line segment across the ground, dealing 2d4 fire damage to all units within the line’s path.",
							"range": 6
						},
						{
							"name": "tar",
							"description": "cover a 2” wide square in grease.This area is difficult terrain.Any fire damage that occurs in this area ignites the tar, dealing 2d6 fire damage to units within the area and removing the tar.A unit using this ability can only have one area of tar active at a time: subsequent castings remove prior patches of tar.",
							"range": 2
						}
					],
					"name": "Boom",
					"maxHP": 13,
					"movedThisTurn": false,
					"movement": 4,
					"x": 0,
					"y": 2,
					"weapon": {
						"dmg": {
							"sides": 6
						},
						"hit": 1
					},
					"armor": 0
				}
			],
			"name": "player 1",
			"hand": [
				{
					"type": "weapon",
					"uid": "0d81829f-e5de-42ad-97fc-0bdf89188461"
				},
				{
					"type": "weapon",
					"uid": "82f2ec57-777d-40b3-b480-4bc297df48c9"
				},
				{
					"type": "hand",
					"uid": "f6310a28-e277-4a56-8051-411eee625fd1"
				},
				{
					"type": "hand",
					"uid": "32271eb6-2397-4f3d-a5a2-1e2c2255a14b"
				},
				{
					"type": "hand",
					"uid": "f69dd2db-1fda-4865-9485-4f33f11255ba"
				}
			],
			"deck": [
				{
					"type": "hand",
					"uid": "783f8d54-268b-493f-8560-d89ab791b2a6"
				},
				{
					"type": "weapon",
					"uid": "7c9d930d-2a96-4fb9-8dc9-cf683ca4912c"
				},
				{
					"type": "hand",
					"uid": "9616e60b-d972-4649-85b4-051cedb16fc3"
				},
				{
					"type": "hand",
					"uid": "d2afb7ae-5cd9-4ccf-add8-0718117574e8"
				},
				{
					"type": "weapon",
					"uid": "5544d2ad-2dcd-48ad-a25a-857196669c2f"
				}
			],
			"discard": []
		},
		{
			"chars": [
				{
					"color": "red",
					"evasion": 14,
					"hp": 20,
					"abilities": [
						{
							"name": "Wide Swipe",
							"description": "using a melee slashing or bludgeoning weapon without reach, the unit makes a melee attack against every creature in range within a 180° arc."
						},
						{
							"name": "Shield Bash",
							"description": "this unit attacks target with their shield, a weapon that deals 1d6 bludgeoning damage with +3 to hit.On hit, the target falls prone.Unit has + 1 armor until the beginning of next turn."
						},
						{
							"name": "Decisive Strike",
							"description": "Make a melee attack with +3 to attack and damage.On hit, if the target has - 2 armor or less, add an additional 1d4 points of damage of the weapon’s damage type."
						}
					],
					"name": "Boop",
					"maxHP": 20,
					"movedThisTurn": false,
					"movement": 4,
					"x": 29,
					"y": 19,
					"weapon": {
						"dmg": {
							"sides": 10
						},
						"hit": 3
					},
					"armor": -4
				},
				{
					"color": "orange",
					"evasion": 16,
					"hp": 16,
					"abilities": [
						{
							"name": "Leg Shot",
							"description": "Description: make a ranged attack.On hit, the damage of this attack is reduced by half and the target’s movement is reduced to zero for one turn.",
							"range": 4
						},
						{
							"name": "Skirmisher",
							"description": "As a reaction, make one movement out of turn using leftover movement from the previous turn.",
							"use": "reaction"
						},
						{
							"name": "Multishot",
							"description": "make 3 ranged attacks.These can be aimed at the same target or different targets.",
							"range": 8
						}
					],
					"name": "Bow",
					"maxHP": 16,
					"movedThisTurn": false,
					"hand": {
						"dmg": {
							"sides": 6
						},
						"hit": 3
					},
					"movement": 5,
					"x": 29,
					"y": 18,
					"weapon": {
						"dmg": {
							"sides": 10
						},
						"hit": 3,
						"range": 8
					},
					"armor": -2
				},
				{
					"color": "yellow",
					"evasion": 12,
					"hp": 13,
					"abilities": [
						{
							"name": "Flame Shield",
							"description": "until the end of next turn, this unit is surrounded by a ring of flames that deals 1d6 fire damage to adjacent units.This damage is dealt to any units that are adjacent when the ability is first activated and to any units that move adjacent to this unit.",
							"range": 4
						},
						{
							"name": "Ray of Immolation",
							"description": "a fiery beam burns a 2” line segment across the ground, dealing 2d4 fire damage to all units within the line’s path.",
							"range": 6
						},
						{
							"name": "tar",
							"description": "cover a 2” wide square in grease.This area is difficult terrain.Any fire damage that occurs in this area ignites the tar, dealing 2d6 fire damage to units within the area and removing the tar.A unit using this ability can only have one area of tar active at a time: subsequent castings remove prior patches of tar.",
							"range": 2
						}
					],
					"name": "Boom",
					"maxHP": 13,
					"movedThisTurn": false,
					"movement": 4,
					"x": 29,
					"y": 17,
					"weapon": {
						"dmg": {
							"sides": 6
						},
						"hit": 1
					},
					"armor": 0
				}
			],
			"name": "player 2",
			"hand": [
				{
					"type": "weapon",
					"uid": "34afc023-e5ab-48d1-a72e-501ea6e3e977"
				},
				{
					"type": "hand",
					"uid": "afd90875-f159-4c78-ae6e-aa4bc497bb7e"
				},
				{
					"type": "hand",
					"uid": "6f1556f9-3616-42ce-89df-f2345a98159c"
				},
				{
					"type": "weapon",
					"uid": "06c0561b-049e-4aba-af51-3540aab5d1ea"
				},
				{
					"type": "weapon",
					"uid": "834660a0-54e5-4099-8296-ca4bc428cf2e"
				}
			],
			"deck": [
				{
					"type": "hand",
					"uid": "8c58a4e0-f0c0-4bf1-95d7-80e404cfcfef"
				},
				{
					"type": "weapon",
					"uid": "3cf868da-0ff3-490a-a866-ac6dace931f0"
				},
				{
					"type": "hand",
					"uid": "e3c0f990-0ab3-4d97-9111-0de0988fd4bc"
				},
				{
					"type": "hand",
					"uid": "acf7123c-82ce-4c01-8767-ac3368b47ae5"
				},
				{
					"type": "hand",
					"uid": "7eb52521-de9b-4b5d-98f2-828916c68eaa"
				}
			],
			"discard": []
		}
	],
	"playerReadyState": [
		false,
		false
	],
	"screen": "table",
	"playerCount": 2,
	"playPhase": "buy",
	"whosTurn": 0,
	"boardHeight": 20,
	"boardWidth": 30
});

export const immutableInitialGameState = (playerCount: number): ImmutableGameState => Immutable.fromJS(initialGameState(playerCount));
export default initialGameState;

