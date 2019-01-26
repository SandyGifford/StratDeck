import "./CharacterSelect.style";

import * as React from "react";

import characters from "../../characters/characters";

export interface CharacterSelectProps { }
export interface CharacterSelectState { }

export default class CharacterSelect extends React.PureComponent<CharacterSelectProps, CharacterSelectState> {
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
							<div className="CharacterSelect__character__stats__stat">
								<div className="CharacterSelect__character__stats__stat__name">HP</div>
								<div className="CharacterSelect__character__stats__stat__value CharacterSelect__character__stats__stat__value--mono">{char.hp}</div>
							</div>
							<div className="CharacterSelect__character__stats__stat">
								<div className="CharacterSelect__character__stats__stat__name">armor</div>
								<div className="CharacterSelect__character__stats__stat__value CharacterSelect__character__stats__stat__value--mono">{char.armor}</div>
							</div>
							<div className="CharacterSelect__character__stats__stat">
								<div className="CharacterSelect__character__stats__stat__name">evasion</div>
								<div className="CharacterSelect__character__stats__stat__value CharacterSelect__character__stats__stat__value--mono">{char.evasion}</div>
							</div>
							<div className="CharacterSelect__character__stats__stat">
								<div className="CharacterSelect__character__stats__stat__name">speed</div>
								<div className="CharacterSelect__character__stats__stat__value CharacterSelect__character__stats__stat__value--mono">{char.movement}</div>
							</div>
						</div>
					</div>)
				}
			</div>
		);
	}
}