import "./PlayerDecks.style";

import * as React from "react";
import { ImmutablePlayerState } from "@typings/game";
import { CardClickEventHandler } from "../Card/Card";
import DeckDeck from "../DeckDeck/DeckDeck";

export interface PlayerDecksProps {
	label?: React.ReactNode;
	player: ImmutablePlayerState;
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

		const deck = player.get("deck");
		const discard = player.get("discard");

		return (
			<div className="PlayerDecks">
				<div className="PlayerDecks__deck">
					<DeckDeck
						onMouseDown={onDeckMouseDown}
						label={`deck (${deck.size})`}
						facedown={true}
						deck={deck} />
				</div>
				<div className="PlayerDecks__discard">
					<DeckDeck
						onMouseDown={onDiscardMouseDown}
						label={`discard (${discard.size})`}
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