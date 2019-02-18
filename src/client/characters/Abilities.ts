import { CharacterAbility } from "@shared/typing/character";

export default class Abilities {
	// Boop
	public static readonly wideSwipe: CharacterAbility = {
		name: "Wide Swipe",
		description: "using a melee slashing or bludgeoning weapon without reach, the unit makes a melee attack against every creature in range within a 180° arc.",
	};
	public static readonly shieldBash: CharacterAbility = {
		name: "Shield Bash",
		description: "this unit attacks target with their shield, a weapon that deals 1d6 bludgeoning damage with +3 to hit.On hit, the target falls prone.Unit has + 1 armor until the beginning of next turn.",
	};
	public static readonly decisiveStrike: CharacterAbility = {
		name: "Decisive Strike",
		description: "Make a melee attack with +3 to attack and damage.On hit, if the target has - 2 armor or less, add an additional 1d4 points of damage of the weapon’s damage type.",
	};

	// Bow
	public static readonly legShot: CharacterAbility = {
		name: "Leg Shot",
		description: "Description: make a ranged attack.On hit, the damage of this attack is reduced by half and the target’s movement is reduced to zero for one turn.",
		range: 4,
	};
	public static readonly skirmisher: CharacterAbility = {
		name: "Skirmisher",
		description: "As a reaction, make one movement out of turn using leftover movement from the previous turn.",
		use: "reaction",
	};
	public static readonly multishot: CharacterAbility = {
		name: "Multishot",
		description: "make 3 ranged attacks.These can be aimed at the same target or different targets.",
		range: 8,
	};

	// Boom
	public static readonly flameShield: CharacterAbility = {
		name: "Flame Shield",
		description: "until the end of next turn, this unit is surrounded by a ring of flames that deals 1d6 fire damage to adjacent units.This damage is dealt to any units that are adjacent when the ability is first activated and to any units that move adjacent to this unit.",
		range: 4,
	};
	public static readonly rayOfImmolation: CharacterAbility = {
		name: "Ray of Immolation",
		description: "a fiery beam burns a 2” line segment across the ground, dealing 2d4 fire damage to all units within the line’s path.",
		range: 6,
	};
	public static readonly tar: CharacterAbility = {
		name: "tar",
		description: "cover a 2” wide square in grease.This area is difficult terrain.Any fire damage that occurs in this area ignites the tar, dealing 2d6 fire damage to units within the area and removing the tar.A unit using this ability can only have one area of tar active at a time: subsequent castings remove prior patches of tar.",
		range: 2,
	};

	// Boob
	public static readonly bigAttack: CharacterAbility = {
		name: "Big Attack",
		description: "the unit raises their weapon high over head and brings it down with great strength and inaccuracy.  - 4 to hit, double damage.",
	};
	public static readonly regenerativeAura: CharacterAbility = {
		name: "Regenerative Aura",
		description: "all allied creatures in a 3 inch radius receive + 2 to their regen rolls on their next turn.",
	};
	public static readonly earthquake: CharacterAbility = {
		name: "earthquake",
		description: "the unit smashes a bludgeoning melee weapon into the ground, shaking the earth and causing all creatures within a 2” radius to be pushed back 1”, go prone, and take 1d8 bludgeoning damage.",
	};

	// Booger
	public static readonly trip: CharacterAbility = {
		name: "Trip",
		description: "using a weapon with the reach property, this unit makes a melee attack.On hit, the attack does half damage and causes the target unit to go prone.",
	};
	public static readonly defensiveStance: CharacterAbility = {
		name: "Defensive Stance",
		description: "this unit cannot move for the remainder of this turn.The unit has + 3 to evasion until the beginning of its next turn.Until the beginning of this unit’s next turn, this unit can make one attack against any unit that moves within range of this unit; this attack occurs out of turn and before an enemy unit has the opportunity to make their own attack.",
	}
	public static readonly charge: CharacterAbility = {
		name: "Charge",
		description: "after moving in a straight line for at least 1 inch, the unit makes a melee attack that deals double damage. ",
	};

	// Bog
	public static readonly poisonSpray: CharacterAbility = {
		name: "Poison Spray",
		description: "this unit sprays a cloud of cough - inducing poison in a 2” cone.All units in this cone make attack rolls with disadvantage until next turn.",
	};
	public static readonly heal: CharacterAbility = {
		name: "Heal",
		description: "Restore 1d6 hp to target creature",
	};
	public static readonly graspingVines: CharacterAbility = {
		name: "Grasping Vines",
		description: "vines sprout from the ground in a 2” wide cube.The vines attack any enemy creature that enters this area: when a unit enters this area or begins their turn in this area, and again for every additional inch of movement through this area, the vines make an attack against the unit with +0 to hit, dealing 1d6 piercing damage on hit and preventing the unit from moving until the start of their next turn.A unit using this ability can only have one area of vine active at a time: subsequent castings remove prior areas of vines.",
	};

	// Boot
	public static readonly pin: CharacterAbility = {
		name: "Pin",
		description: "make a ranged attack against a target that is adjacent to a wall or other vertical surface.On hit, the target takes half the attack’s normal damage and is pinned to the nearby wall.While pinned, the target cannot move unless it uses an action to remove the projectile that is pinning it.",
	};
	public static readonly wallRun: CharacterAbility = {
		name: "Wall Run",
		description: "this unit runs swiftly along a vertical surface for up to 4 inches, using its normal pool of movement.This movement can be used to traverse horizontally along a wall, and also up to 2 inches vertically up a wall.This movement ignores opportunity attacks.At any point during this movement, the unit can make a melee or ranged attack.",
	};
	public static readonly precisionStab: CharacterAbility = {
		name: "Precision Stab",
		description: "using a dagger, the unit makes an attack with +6 Armor Piercing, dealing triple damage on hit.If the target is prone, the damage is instead quadrupled.",
	};

	// Boar
	public static readonly pull: CharacterAbility = {
		name: "Pull",
		description: "using a whip or halbert, make a melee attack against a unit in range.On hit, that unit takes the attack’s normal damage and is pulled to the closest uninhabited tile between the target unit and this unit.",
	};
	public static readonly throwAlly: CharacterAbility = {
		name: "Throw Ally",
		description: "throw an allied, adjacent unit to a new location.The allied unit can be moved in a straight 3’ line to any location, including mid - air.If an obstacle, for example terrain or another unit, interrupts this straight line, the thrown unit stops in front of that obstacle rather than completing its trajectory, taking 1d6 kinetic 3 bludgeoning damage[+also damage to obstacle if it’s a unit ?].",
	};
	public static readonly scrap: CharacterAbility = {
		name: "Scrap",
		description: "",
	};
}
