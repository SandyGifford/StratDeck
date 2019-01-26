import "./CharacterSelectStat.style";

import * as React from "react";

export interface CharacterSelectStatProps {
	name: string;
}
export interface CharacterSelectStatState { }

export default class CharacterSelectStat extends React.PureComponent<CharacterSelectStatProps, CharacterSelectStatState> {
	constructor(props: CharacterSelectStatProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { name, children } = this.props;

		return (
			<div className="CharacterSelectStat">
				<div className="CharacterSelectStat__name">{name}</div>
				<div className="CharacterSelectStat__value">{children}</div>
			</div>
		);
	}
}