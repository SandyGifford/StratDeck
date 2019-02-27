import "./Board.style";

import * as React from "react";
import { ImmutableTablePlayerStates, PlayPhase } from "@typings/game";
import LoopUtils from "@utils/LoopUtils";
import BoardSpace from "../BoardSpace/BoardSpace";
import { Vector2 } from "@typings/vector";
import ServerConnect from "@client/connection/ServerConnect";

export type BoardOnMoveHandler = (playerIndex: number, charIndex: number, move: Vector2) => void;

export interface BoardProps {
	width: number;
	height: number;
	players: ImmutableTablePlayerStates;
	isMyTurn: boolean;
	myPlayerIndex: number;
	playPhase: PlayPhase;
}
export interface BoardState {
	selectedCharIndex: number;
}

export default class Board extends React.PureComponent<BoardProps, BoardState> {
	constructor(props: BoardProps) {
		super(props);
		this.state = {
			selectedCharIndex: null,
		};
	}

	public render(): React.ReactNode {
		const { width, height, players, myPlayerIndex } = this.props;
		const { selectedCharIndex } = this.state;

		const canMove = this.canMove();

		return (
			<div className="Board" style={{
				width: `${width * 3}em`,
				height: `${height * 3}em`,
			}}>
				{
					LoopUtils.mapTimes(height, y => {
						return LoopUtils.mapTimes(width, x => {
							const { charIndex, playerIndex } = this.findCharAtPosition(x, y);

							const charOnSpot = typeof playerIndex === "number" ?
								players.get(playerIndex).get("chars").get(charIndex) :
								null;

							const isSelected = playerIndex === myPlayerIndex && charIndex === selectedCharIndex;
							const spotColor = charOnSpot ? charOnSpot.get("color") : null;

							return <BoardSpace
								onClick={this.makeBoardSpaceClickedHandler(x, y, charIndex, playerIndex)}
								canMove={canMove}
								charSelected={isSelected}
								x={x}
								y={y}
								key={`${x}-${y}`}
								charColor={spotColor} />
						})
					})
				}
			</div>
		)
	}

	private makeBoardSpaceClickedHandler(x: number, y: number, charIndex: number, playerIndex: number): () => void {
		const { myPlayerIndex, players } = this.props;
		const { selectedCharIndex } = this.state;
		const charOnSpot = typeof playerIndex === "number" ?
			players.get(playerIndex).get("chars").get(charIndex) :
			null;

		const charIsSelected = typeof selectedCharIndex === "number";

		return () => {
			if (!this.canMove()) return;
			if (typeof playerIndex === "number" && playerIndex !== myPlayerIndex) return;


			if (charIsSelected) {
				if (selectedCharIndex === charIndex) {
					this.setState({
						selectedCharIndex: null,
					});
					return;
				}

				if (!charOnSpot) {

					ServerConnect.moveChar(selectedCharIndex, { x, y })

					this.setState({
						selectedCharIndex: null,
					});
					return
				}
			} else {
				if (charOnSpot && !charIsSelected) {
					this.setState({
						selectedCharIndex: charIndex,
					});
					return
				}

			}
		};
	}

	private canMove(): boolean {
		return this.props.isMyTurn && this.props.playPhase === "move";
	}

	private findCharAtPosition(x: number, y: number): { playerIndex: number, charIndex: number } {
		const { players } = this.props;

		let charOnSpotIndex: number;
		let charOnSpotPlayerIndex: number;

		players.every((player, playerIndex) => {
			return player.get("chars").every((char, charIndex) => {
				const found = char.get("x") === x && char.get("y") === y;
				if (found) {
					charOnSpotIndex = charIndex;
					charOnSpotPlayerIndex = playerIndex;
				}
				return !found;
			});
		});

		return {
			playerIndex: charOnSpotPlayerIndex,
			charIndex: charOnSpotIndex,
		};
	}
}