import "./Board.style";

import * as React from "react";
import LoopUtils from "../../../../utils/LoopUtils";
import BoardSpace from "../BoardSpace/BoardSpace";
import TableCharacterDef, { TablePlayerState } from "../../../../typings/game";

export interface BoardProps {
	width: number;
	height: number;
	players: TablePlayerState[];
}
export interface BoardState { }

export default class Board extends React.PureComponent<BoardProps, BoardState> {
	constructor(props: BoardProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { width, height, players } = this.props;

		return (
			<div className="Board" style={{
				width: width * 30,
				height: height * 30,
			}}>
				{
					LoopUtils.mapTimes(height, r => {
						return LoopUtils.mapTimes(width, c => {

							let charOnSpot: TableCharacterDef;

							players.every(player => {
								return player.chars.every(char => {
									const found = char.x === c && char.y === r;
									if (found) charOnSpot = char;
									return !found;
								});
							});

							const spotColor = charOnSpot ? charOnSpot.color : null;

							return <BoardSpace x={c} y={r} key={`${c}-${r}`} playerColor={spotColor} />
						})
					})
				}
			</div>
		)
	}
}