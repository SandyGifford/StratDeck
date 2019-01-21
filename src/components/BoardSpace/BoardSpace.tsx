import "./BoardSpace.style";

import * as React from "react";

export interface BoardSpaceProps {
	x: number;
	y: number;
}
export interface BoardSpaceState { }

export default class BoardSpace extends React.PureComponent<BoardSpaceProps, BoardSpaceState> {
	constructor(props: BoardSpaceProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { x, y } = this.props;
		return (
			<div className="BoardSpace" style={{
				top: y * 30,
				left: x * 30,
			}} />
		)
	}
}