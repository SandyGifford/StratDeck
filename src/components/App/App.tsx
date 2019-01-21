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
				<Deck topType="ability3" facedown={false} rotation={-90} cardCount={50} y={20} x={70} />
				<Deck topType="ability2" facedown={false} rotation={-90} cardCount={50} y={170} x={70} />
				<Deck topType="ability1" facedown={false} rotation={-90} cardCount={50} y={320} x={70} />
				<Deck topType="weapon" facedown={false} rotation={-90} cardCount={50} y={470} x={70} />
				<Deck topType="hand" facedown={false} rotation={-90} cardCount={50} y={620} x={70} />
			</div>
		)
	}
}