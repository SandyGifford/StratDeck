import "./BoardSpace.style";

import * as React from "react";

export interface BoardSpaceProps {
	x: number;
	y: number;
	playerColor?: string;
	spaceColor?: string;
}
export interface BoardSpaceState { }

export default class BoardSpace extends React.PureComponent<BoardSpaceProps, BoardSpaceState> {
	constructor(props: BoardSpaceProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { x, y, playerColor, spaceColor } = this.props;
		return (
			<div className="BoardSpace" style={{
				top: y * 30,
				left: x * 30,
				backgroundColor: spaceColor,
			}}>
				<div className="BoardSpace__center" style={{
					backgroundColor: playerColor,
				}} />
			</div>
		)
	}
}