import "./CharacterSelect.style";

import * as React from "react";
import { CharacterWeapon, PlayerCharacters } from "@typings/character";
import CharacterSelectStat from "./subComponents/CharacterSelectStat/CharacterSelectStat";
import characters from "@client/characters/characters";
import WeaponDice from "@components/WeaponDice/WeaponDice";
import AbilityStatItem from "./subComponents/AbilityStatItem/AbilityStatItem";
import SimpleButton from "@components/SimpleButton/SimpleButton";
import ServerConnect from "@client/connection/ServerConnect";
import ArrayUtils from "@utils/ArrayUtils";
import LoopUtils from "@utils/LoopUtils";
import { CardType } from "@typings/game";


export interface CharacterSelectProps {
	playerIndex: number;
	alreadySelected: boolean;
	boardWidth: number;
	boardHeight: number;
}

export interface CharacterSelectState {
	selected: [number, number, number];
	playerName: string;
}

export default class CharacterSelect extends React.PureComponent<CharacterSelectProps, CharacterSelectState> {
	private static readonly DEFAULT_HAND_DAMAGE: CharacterWeapon = {
		dmg: { sides: 4 },
		hit: 2,
	};

	constructor(props: CharacterSelectProps) {
		super(props);

		this.state = {
			selected: [0, 1, 2],
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
							<div className="CharacterSelect__characters__character__name">{char.name}</div>
							<div className="CharacterSelect__characters__character__stats">
								<CharacterSelectStat name="HP">
									<span className="CharacterSelect__characters__character__stats__mono">{char.hp}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="armor">
									<span className="CharacterSelect__characters__character__stats__mono">{char.armor}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="evasion">
									<span className="CharacterSelect__characters__character__stats__mono">{char.evasion}</span>
								</CharacterSelectStat>
								<CharacterSelectStat name="speed">
									<span className="CharacterSelect__characters__character__stats__mono">{char.movement}</span>
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
							<div className="CharacterSelect__characters__character__border" style={{
								borderColor: isSelected ? char.color : "transparent",
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

	private continue = () => {
		const { playerIndex } = this.props;
		const { selected, playerName } = this.state;

		ServerConnect.initializePlayer(playerIndex, {
			chars: selected.map(charIndex => characters[charIndex]) as PlayerCharacters,
			name: playerName,
			hand: [],
			deck: ArrayUtils.shuffle([
				...this.makeCards(6, "hand"),
				...this.makeCards(4, "weapon")
			]),
			discard: [],
		});
	};

	private makeCards(num: number, type: CardType): CardType[] {
		return LoopUtils.mapTimes(num, () => type);
	}
}