import "./PlayerDecks.style";

import * as React from "react";
import { PlayerState } from "@typings/game";
import { CardClickEventHandler } from "../Card/Card";
import DeckDeck from "../DeckDeck/DeckDeck";

export interface PlayerDecksProps {
	label?: React.ReactNode;
	player: PlayerState;
	onDiscardMouseDown?: CardClickEventHandler;
	onDeckMouseDown?: CardClickEventHandler;
}
export interface PlayerDecksState { }

export default class PlayerDecks extends React.PureComponent<PlayerDecksProps, PlayerDecksState> {
	constructor(props: PlayerDecksProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const {
			player,
			onDiscardMouseDown,
			onDeckMouseDown,
			label
		} = this.props;

		const { deck, discard } = player;

		return (
			<div className="PlayerDecks">
				<div className="PlayerDecks__deck">
					<DeckDeck
						onMouseDown={onDeckMouseDown}
						label={`deck (${deck.length})`}
						facedown={true}
						deck={deck} />
				</div>
				<div className="PlayerDecks__discard">
					<DeckDeck
						onMouseDown={onDiscardMouseDown}
						label={`discard (${discard.length})`}
						facedown={false}
						deck={discard} />
				</div>
				{
					label ?
						<div className="PlayerDecks__label">{label}</div> : null
				}
			</div>
		);
	}
}