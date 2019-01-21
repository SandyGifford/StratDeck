import "./Board.style";

import * as React from "react";
import LoopUtils from "../../utils/LoopUtils";
import BoardSpace from "../BoardSpace/BoardSpace";

export interface BoardProps {
	width: number;
	height: number;
}
export interface BoardState { }

export default class Board extends React.PureComponent<BoardProps, BoardState> {
	constructor(props: BoardProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { width, height } = this.props;

		return (
			<div className="Board" style={{
				width: width * 30,
				height: height * 30,
			}}>
				{
					LoopUtils.mapTimes(height, r => LoopUtils.mapTimes(width, c => <BoardSpace x={c} y={r} key={`${c}-${r}`} />))
				}
			</div>
		)
	}
}