import "./CharacterSelect.style";

import * as React from "react";

import characters from "../../characters/characters";
import WeaponDice from "../WeaponDice/WeaponDice";
import CharacterSelectStat from "./subComponents/CharacterSelectStat/CharacterSelectStat";
import AbilityStatItem from "./subComponents/AbilityStatItem/AbilityStatItem";
import { CharacterWeapon } from "../../typings/character";
import DOMUtils from "../../utils/DOMUtils";
import { PlayerCharacters, PlayerState } from "../../typings/game";


export type SetPlayers = (players: PlayerState[]) => void;

export interface CharacterSelectProps {
	setPlayerCharacters: SetPlayers;
	numberOfPlayers: number;
}
export interface CharacterSelectState {
	playerIndex: number;
	selected: [number, number, number];
	players: PlayerState[];
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
			playerIndex: 0,
			selected: [1, 2, 3],
			players: [],
			playerName: "player 1",
		};
	}

	public render(): React.ReactNode {
		const { selected, playerName } = this.state;

		const continueClassName = DOMUtils.BEMClassName("CharacterSelect__controls__button", {
			"disabled": selected.indexOf(null) !== -1 || !playerName,
		});

		return (
			<div className="CharacterSelect">
				<div className="CharacterSelect__playerDetails">
					<input
						value={playerName}
						onChange={this.nameChanged}
						className="CharacterSelect__playerDetails__name"
						placeholder="-- player name --" />
				</div>
				<div className="CharacterSelect__characters">
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
				</div>
				<div className="CharacterSelect__controls">
					<div className={continueClassName} onClick={this.continue}>continue</div>
				</div>
			</div>
		);
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
		const { setPlayerCharacters, numberOfPlayers } = this.props;
		const { selected, players, playerIndex, playerName } = this.state;

		players.push({
			name: playerName,
			chars: selected.map(index => characters[index]) as PlayerCharacters,
		});

		if (playerIndex < numberOfPlayers - 1) {
			const nextPlayerIndex = playerIndex + 1;
			this.setState({
				selected: [1, 2, 3],
				playerIndex: nextPlayerIndex,
				players: players,
				playerName: `player ${nextPlayerIndex + 1}`,
			});
		} else {
			setPlayerCharacters(players);
		}
	};
}