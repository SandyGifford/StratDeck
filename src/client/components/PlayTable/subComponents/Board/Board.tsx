import "./Board.style";

import * as React from "react";
import { TablePlayerState } from "@typings/game";
import LoopUtils from "@utils/LoopUtils";
import { TableCharacterDef } from "@typings/character";
import BoardSpace from "../BoardSpace/BoardSpace";

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
				width: `${width * 3}em`,
				height: `${height * 3}em`,
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