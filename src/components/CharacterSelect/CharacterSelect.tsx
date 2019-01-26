import "./CharacterSelect.style";

import * as React from "react";

import characters from "../../characters/characters";
import WeaponDice from "../WeaponDice/WeaponDice";
import CharacterSelectStat from "./subComponents/CharacterSelectStat/CharacterSelectStat";
import { CharacterWeapon } from "../../characters/typings";
import AbilityStatItem from "./subComponents/AbilityStatItem/AbilityStatItem";

export interface CharacterSelectProps { }
export interface CharacterSelectState { }

export default class CharacterSelect extends React.PureComponent<CharacterSelectProps, CharacterSelectState> {
	private static readonly DEFAULT_HAND_DAMAGE: CharacterWeapon = {
		dmg: { sides: 4 },
		hit: 2
	};

	constructor(props: CharacterSelectProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="CharacterSelect">
				{
					characters.map((char, index) => <div className="CharacterSelect__character" key={index}>
						<div className="CharacterSelect__character__name">{char.name}</div>
						<div className="CharacterSelect__character__stats">
							<CharacterSelectStat name="HP">
								<span className="CharacterSelect__character__stats__mono">{char.hp}</span>
							</CharacterSelectStat>
							<CharacterSelectStat name="armor">
								<span className="CharacterSelect__character__stats__mono">{char.armor}</span>
							</CharacterSelectStat>
							<CharacterSelectStat name="evasion">
								<span className="CharacterSelect__character__stats__mono">{char.evasion}</span>
							</CharacterSelectStat>
							<CharacterSelectStat name="speed">t
								<span className="CharacterSelect__character__stats__mono">{char.movement}</span>
							</CharacterSelectStat>
							<CharacterSelectStat name="weapon">
								<WeaponDice weapon={char.weapon} />
							</CharacterSelectStat>
							<CharacterSelectStat name="hand">
								<WeaponDice weapon={char.hand || CharacterSelect.DEFAULT_HAND_DAMAGE} />
							</CharacterSelectStat>
							<CharacterSelectStat name="abilities">
								{
									char.abilities.map((abil, index) => <AbilityStatItem ability={abil} key={index} />)
								}
							</CharacterSelectStat>
						</div >
					</div >)
				}
			</div>
		);
	}
}