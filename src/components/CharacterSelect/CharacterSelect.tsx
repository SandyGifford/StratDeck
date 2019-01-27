import "./CharacterSelect.style";

import * as React from "react";

import characters from "../../characters/characters";
import WeaponDice from "../WeaponDice/WeaponDice";
import CharacterSelectStat from "./subComponents/CharacterSelectStat/CharacterSelectStat";
import AbilityStatItem from "./subComponents/AbilityStatItem/AbilityStatItem";
import { CharacterWeapon } from "../../typings/character";
import DOMUtils from "../../utils/DOMUtils";

export interface CharacterSelectProps { }
export interface CharacterSelectState {
	selected: [number, number, number];
}

export default class CharacterSelect extends React.PureComponent<CharacterSelectProps, CharacterSelectState> {
	private static readonly DEFAULT_HAND_DAMAGE: CharacterWeapon = {
		dmg: { sides: 4 },
		hit: 2
	};

	constructor(props: CharacterSelectProps) {
		super(props);
		this.state = {
			selected: [null, null, null],
		};
	}

	public render(): React.ReactNode {
		const { selected } = this.state;

		return (
			<div className="CharacterSelect">
				{
					characters.map((char, index) => {
						const selectionSlot = selected.indexOf(index);

						const className = DOMUtils.BEMClassName("CharacterSelect__character", {
							[`selected${selectionSlot}`]: selectionSlot !== -1,
						});

						return <div className={className} key={index} onClick={() => this.toggleSelect(index)}>
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
								<CharacterSelectStat name="speed">
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
						</div >
					})
				}
			</div>
		);
	}

	private toggleSelect = (index: number): void => {
		const selected = [...this.state.selected] as [number, number, number];
		const selectionSlot = selected.indexOf(index);
		const firstOpen = selected.indexOf(null);

		if (selectionSlot === -1 && firstOpen !== -1) {
			selected[firstOpen] = index;

			this.setState({
				selected: selected,
			});
		} else if (selectionSlot !== -1) {
			selected[selectionSlot] = null;

			this.setState({
				selected: selected,
			});
		}
	}
}