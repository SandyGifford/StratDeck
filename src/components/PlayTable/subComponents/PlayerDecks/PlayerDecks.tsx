import "./PlayerDecks.style";

import * as React from "react";
import { CardType, CardClickEventHandler } from "../Card/Card";
import Deck from "../Deck/Deck";

export interface PlayerDecksProps {
	label?: React.ReactNode;
	topDiscardType: CardType;
	discardCount: number;
	deckCount: number;
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
			topDiscardType,
			discardCount,
			deckCount,
			onDiscardMouseDown,
			onDeckMouseDown,
			label
		} = this.props;

		return (
			<div className="PlayerDecks">
				<div className="PlayerDecks"></div>
				<div className="PlayerDecks__deck">
					<Deck
						topType={topDiscardType}
						onMouseDown={onDeckMouseDown}
						label={`deck (${deckCount})`}
						facedown={false}
						cardCount={100} />
				</div>
				<div className="PlayerDecks__discard">
					<Deck
						onMouseDown={onDiscardMouseDown}
						label={`discard (${discardCount})`}
						facedown={true}
						cardCount={100} />
				</div>
				{
					label ?
						<div className="PlayerDecks__label">{label}</div> : null
				}
			</div>
		)
	}
}