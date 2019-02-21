import "./WeaponDice.style";

import * as React from "react";
import { ImmutableCharacterWeapon } from "@typings/character";

export interface WeaponDiceProps {
	weapon: ImmutableCharacterWeapon;
}
export interface WeaponDiceState { }

export default class WeaponDice extends React.PureComponent<WeaponDiceProps, WeaponDiceState> {
	constructor(props: WeaponDiceProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { weapon } = this.props;
		const dmg = weapon.get("dmg");
		const hit = weapon.get("hit");
		const count = dmg.get("count");
		const sides = dmg.get("sides");

		return (
			<span className="WeaponDice">
				<span className="WeaponDice__mono">{count || 1}</span>d<span className="WeaponDice__mono">{sides}</span> (<span className="WeaponDice__mono">{hit >= 0 ? "+" : ""}{hit}</span> to hit)
			</span>
		);
	}
}