import "./App.style";

import * as React from "react";

import Deck from "../Deck/Deck";
import Hand from "../Hand/Hand";

export interface AppProps { }
export interface AppState {

}

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="App">
				<div className="App__decks">
					<Deck className="App__decks__deck" label={this.renderDeckLabel("hand attack", 1)} topType="hand" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" label={this.renderDeckLabel("weapon attack", 2)} topType="weapon" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" label={this.renderDeckLabel("ability 1", 3)} topType="ability1" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" label={this.renderDeckLabel("ability 2", 4)} topType="ability2" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" label={this.renderDeckLabel("ability 3", 5)} topType="ability3" facedown={false} cardCount={50} />
				</div>
				<div className="App__hand">
					<Hand
						cards={["hand", "hand", "ability1"]} />
				</div>
				<div className="App__playerDecks">
					<Deck
						label="deck"
						className="App__playerDecks__deck"
						facedown={true}
						cardCount={100} />
					<Deck
						label="discard"
						className="App__playerDecks__deck"
						facedown={false}
						cardCount={100} />
				</div>
			</div>
		)
	}

	private renderDeckLabel(text: string, cost: number): React.ReactNode {
		return <div className="App__decks__deck__label">
			<div className="App__decks__deck__label__text">{text}</div>
			<div className="App__decks__deck__label__cost">{cost}</div>
		</div>;
	}
}