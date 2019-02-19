import { PlayerState, CardType, TablePlayerState } from "@typings/game";
import DeckUtils from "@utils/DeckUtils";
import ArrayUtils from "@utils/ArrayUtils";
import { Vector2 } from "@typings/vector";
import { TablePlayerCharacters } from "@typings/character";

export default class PlayerUtils {
	public static dealCards(player: PlayerState, cardCount: number): void {
		DeckUtils.dealCardsToDeck(player.deck, player.hand, cardCount);
	}

	public static discardHand(player: PlayerState): void {
		DeckUtils.dealAllCardsToDeck(player.hand, player.discard);
	}

	public static shuffleDiscardToDeck(player: PlayerState): void {
		DeckUtils.dealAllCardsToDeck(player.discard, player.deck);
		player.deck = ArrayUtils.shuffle(player.deck);
	}

	public static addCardToDiscard(player: PlayerState, card: CardType): void {
		DeckUtils.addCardsToTop(player.discard, card);
	}

	public static makeTablePlayer(player: PlayerState, playerIndex: number, boardWidth: number, boardHeight: number): TablePlayerState {
		const positions = this.getPlayerPosition(playerIndex, boardWidth, boardHeight);

		return {
			...player,
			chars: player.chars.map((char, c) => ({
				...char,
				maxHP: char.hp,
				x: positions[c].x,
				y: positions[c].y,
			})) as TablePlayerCharacters,
		}
	}

	public static getPlayerPosition(playerIndex: number, boardWidth: number, boardHeight: number): [Vector2, Vector2, Vector2] {
		switch (playerIndex) {
			case 0:
				return [
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: 0, y: 2 },
				];
			case 1:
				return [
					{ x: boardWidth - 1, y: boardHeight - 1 },
					{ x: boardWidth - 1, y: boardHeight - 2 },
					{ x: boardWidth - 1, y: boardHeight - 3 },
				];
			case 2:
				return [
					{ x: 0, y: boardHeight - 1 },
					{ x: 1, y: boardHeight - 1 },
					{ x: 2, y: boardHeight - 1 },
				];
			case 3:
				return [
					{ x: boardWidth - 1, y: 0 },
					{ x: boardWidth - 2, y: 0 },
					{ x: boardWidth - 3, y: 0 },
				];
			default:
				throw `Board does not support this many players.  Requested start location for player ${playerIndex + 1},  max player count is 2`;
		}
	}
}