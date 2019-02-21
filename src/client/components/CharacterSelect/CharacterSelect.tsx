import "./CharacterSelect.style";

import * as Immutable from "immutable";
import * as React from "react";
import { CharacterWeapon, ImmutableCharacterWeapon } from "@typings/character";
import CharacterSelectStat from "./subComponents/CharacterSelectStat/CharacterSelectStat";
import characters from "@client/characters/characters";
import WeaponDice from "@components/WeaponDice/WeaponDice";
import AbilityStatItem from "./subComponents/AbilityStatItem/AbilityStatItem";
import SimpleButton from "@components/SimpleButton/SimpleButton";
import ServerConnect from "@client/connection/ServerConnect";


export interface CharacterSelectProps {
	playerIndex: number;
	alreadySelected: boolean;
	boardWidth: number;
	boardHeight: number;
}

export interface CharacterSelectState {
	selected: Immutable.List<number>;
	playerName: string;
}

export default class CharacterSelect extends React.PureComponent<CharacterSelectProps, CharacterSelectState> {
	private static readonly DEFAULT_HAND_DAMAGE: CharacterWeapon = {
		dmg: { sides: 4 },
		hit: 2,
	};
	private static readonly IMMUTABLE_DEFAULT_HAND_DAMAGE: ImmutableCharacterWeapon = Immutable.fromJS(CharacterSelect.DEFAULT_HAND_DAMAGE);

	constructor(props: CharacterSelectProps) {
		super(props);

		this.state = {
			selected: Immutable.fromJS([0, 1, 2]),
			playerName: `player ${props.playerIndex + 1}`
		};
	}

	public render(): React.ReactNode {
		const { alreadySelected } = this.props;

		return (
			<div className="CharacterSelect">
				{
					alreadySelected ?
						this.renderAlreadyPicked() :
						this.renderPicker()
				}
			</div>
		);
	}

	private renderAlreadyPicked(): React.ReactNode {
		return <div className="CharacterSelect__alreadyPicked">waiting for other players</div>;
	}

	private renderPicker(): React.ReactNode {
		const { selected, playerName } = this.state;

		const canContinue = selected.indexOf(null) === -1 && !!playerName;

		return [
			<div className="CharacterSelect__playerDetails" key="details">
				<input
					value={playerName}
					onChange={this.nameChanged}
					className="CharacterSelect__playerDetails__name"
					placeholder="-- player name --" />
			</div>,
			<div className="CharacterSelect__characters" key="characters">
				{
					characters.map((char, index) => {
						const selectionSlot = selected.indexOf(index);
						const isSelected = selectionSlot !== -1;

						return <div className="CharacterSelect__characters__character" key={index} onClick={() => this.toggleSelect(index)}>
							<div className="CharacterSelect__characters__character__name">{char.get("name")}</div>
							<div className="CharacterSelect__characters__character__stats">
								<CharacterSelectStat name="HP">
									<span className="CharacterSelect__characters__character__stats__mono">{char.get("hp")}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="armor">
									<span className="CharacterSelect__characters__character__stats__mono">{char.get("armor")}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="evasion">
									<span className="CharacterSelect__characters__character__stats__mono">{char.get("evasion")}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="speed">
									<span className="CharacterSelect__characters__character__stats__mono">{char.get("movement")}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="weapon">
									<WeaponDice weapon={char.get("weapon")} />
								</CharacterSelectStat>
								<CharacterSelectStat name="hand">
									<WeaponDice weapon={char.get("hand", CharacterSelect.IMMUTABLE_DEFAULT_HAND_DAMAGE)} />
								</CharacterSelectStat>
								<CharacterSelectStat name="abilities">
									{
										char.get("abilities").map((abil, index) => <AbilityStatItem ability={abil} key={index} />)
									}
								</CharacterSelectStat>
							</div >
							<div className="CharacterSelect__characters__character__border" style={{
								borderColor: isSelected ? char.get("color") : "transparent",
							}} />
						</div >
					})
				}
			</div>,
			<div className="CharacterSelect__controls" key="controls">
				<SimpleButton onClick={this.continue} disabled={!canContinue}>continue</SimpleButton>
			</div>
		]
	}

	private nameChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		this.setState({
			playerName: e.target.value,
		});
	};

	private toggleSelect = (index: number): void => {
		const { selected } = this.state;
		const selectionSlot = selected.indexOf(index);
		const firstOpen = selected.indexOf(null);

		if (selectionSlot === -1 && firstOpen !== -1) {
			this.setState({
				selected: selected.set(firstOpen, index),
			});
		} else if (selectionSlot !== -1) {
			this.setState({
				selected: selected.set(selectionSlot, null),
			});
		}
	}

	private continue = () => {
		const { playerIndex } = this.props;
		const { selected, playerName } = this.state;

		ServerConnect.initializePlayer(playerIndex, Immutable.fromJS({
			chars: selected.map(charIndex => characters.get(charIndex)),
			name: playerName,
		}));
	};
}