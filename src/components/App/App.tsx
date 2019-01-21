import "./App.style";

import * as React from "react";

import Card from "../Card/Card";

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
				<Card facedown={false} height={0} x={0} y={0} type="hand" />
				<Card facedown={false} height={1} x={300} y={0} type="weapon" />
				<Card facedown={false} height={2} x={0} y={400} type="ability1" />
				<Card facedown={false} height={3} x={300} y={400} type="ability2" />
				<Card facedown={false} height={4} x={600} y={400} type="ability3" />
			</div>
		)
	}
}