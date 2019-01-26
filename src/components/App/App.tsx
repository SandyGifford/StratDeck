import "./App.style";

import * as React from "react";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";

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
				<PlayTable />
				<CharacterSelect />
			</div>
		)
	}
}