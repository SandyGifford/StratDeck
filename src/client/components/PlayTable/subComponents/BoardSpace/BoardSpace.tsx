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
				left: `${x * 3}em`,
				top: `${y * 3}em`,
				backgroundColor: spaceColor,
			}}>
				<div className="BoardSpace__center" style={{
					backgroundColor: playerColor,
				}} />
			</div>
		)
	}
}