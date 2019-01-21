import "./App.style";

import * as React from "react";

import Deck from "../Deck/Deck";

export interface AppProps { }
export interface AppState { }

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="App">
				<div className="App__decks">
					<Deck className="App__decks__deck" topType="hand" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" topType="weapon" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" topType="ability1" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" topType="ability2" facedown={false} cardCount={50} />
					<Deck className="App__decks__deck" topType="ability3" facedown={false} cardCount={50} />
				</div>
			</div>
		)
	}
}