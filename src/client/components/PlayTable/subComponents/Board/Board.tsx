import "./Board.style";

import * as React from "react";
import { ImmutableTablePlayerStates } from "@typings/game";
import LoopUtils from "@utils/LoopUtils";
import { ImmutableTableCharacterDef } from "@typings/character";
import BoardSpace from "../BoardSpace/BoardSpace";

export interface BoardProps {
	width: number;
	height: number;
	players: ImmutableTablePlayerStates;
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

							let charOnSpot: ImmutableTableCharacterDef;

							players.every(player => {
								return player.get("chars").every(char => {
									const found = char.get("x") === c && char.get("y") === r;
									if (found) charOnSpot = char;
									return !found;
								});
							});

							const spotColor = charOnSpot ? charOnSpot.get("color") : null;

							return <BoardSpace x={c} y={r} key={`${c}-${r}`} playerColor={spotColor} />
						})
					})
				}
			</div>
		)
	}
}