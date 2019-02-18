import "./WeaponDice.style";

import * as React from "react";
import { CharacterWeapon } from "@typings/character";

export interface WeaponDiceProps {
	weapon: CharacterWeapon;
}
export interface WeaponDiceState { }

export default class WeaponDice extends React.PureComponent<WeaponDiceProps, WeaponDiceState> {
	constructor(props: WeaponDiceProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { weapon } = this.props;
		const { count, sides } = weapon.dmg;
		const { hit } = weapon;

		return (
			<span className="WeaponDice">
				<span className="WeaponDice__mono">{count || 1}</span>d<span className="WeaponDice__mono">{sides}</span> (<span className="WeaponDice__mono">{hit >= 0 ? "+" : ""}{hit}</span> to hit)
			</span>
		);
	}
}