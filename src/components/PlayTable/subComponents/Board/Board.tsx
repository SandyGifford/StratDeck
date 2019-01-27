import "./Board.style";

import * as React from "react";
import LoopUtils from "../../../../utils/LoopUtils";
import BoardSpace from "../BoardSpace/BoardSpace";
import { TablePlayerState } from "../../../../typings/game";

export interface BoardProps {
	width: number;
	height: number;
	p1: TablePlayerState;
	p2: TablePlayerState;
}
export interface BoardState { }

export default class Board extends React.PureComponent<BoardProps, BoardState> {
	constructor(props: BoardProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { width, height, p1, p2 } = this.props;

		return (
			<div className="Board" style={{
				width: width * 30,
				height: height * 30,
			}}>
				{
					LoopUtils.mapTimes(height, r => {
						return LoopUtils.mapTimes(width, c => {
							const p1OnSpot = p1.chars.find(char => char.x === c && char.y === r);
							const p2OnSpot = p2.chars.find(char => char.x === c && char.y === r);

							const spotColor = p1OnSpot ? p1OnSpot.color : p2OnSpot ? p2OnSpot.color : null;

							return <BoardSpace x={c} y={r} key={`${c}-${r}`} playerColor={spotColor} />
						})
					})
				}
			</div>
		)
	}
}