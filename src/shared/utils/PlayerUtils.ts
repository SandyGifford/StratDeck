import * as Immutable from "immutable";

import { ImmutableTablePlayerState, ImmutablePlayerState, ImmutableTablePlayerStates, ImmutableCardState } from "@typings/game";
import DeckUtils from "@utils/DeckUtils";
import ArrayUtils from "@utils/ArrayUtils";
import { CharPositions } from "@typings/connection";
import { Vector2 } from "@typings/vector";
import CharUtils from "./CharUtils";

export type PlayerDeckType = "deck" | "hand" | "discard";

export default class PlayerUtils {
	public static dealCards(player: ImmutableTablePlayerState, cardCount: number): ImmutableTablePlayerState {
		const deckSize = player.get("deck").size;
		if (cardCount > deckSize) {
			player = this.dealCardsFromDeckToDeck(player, "deck", "hand", deckSize);
			player = this.shuffleDiscardToDeck(player);
			player = this.dealCardsFromDeckToDeck(player, "deck", "hand", cardCount - deckSize)
		} else {
			player = this.dealCardsFromDeckToDeck(player, "deck", "hand", cardCount);
		}

		return player;
	}

	public static dealCardsFromDeckToDeck(player: ImmutableTablePlayerState, fromDeck: PlayerDeckType, toDeck: PlayerDeckType, cardCount: number): ImmutableTablePlayerState {
		const fromTo = DeckUtils.dealCardsToDeck(player.get(fromDeck), player.get(toDeck), cardCount);
		player = player.set(fromDeck, fromTo.fromDeck);
		player = player.set(toDeck, fromTo.toDeck);
		return player;
	}

	public static dealAllCardsFromDeckToDeck(player: ImmutableTablePlayerState, fromDeck: PlayerDeckType, toDeck: PlayerDeckType): ImmutableTablePlayerState {
		return this.dealCardsFromDeckToDeck(player, fromDeck, toDeck, player.get(fromDeck).size);
	}

	public static shuffleDeck(player: ImmutableTablePlayerState, deckType: PlayerDeckType): ImmutableTablePlayerState {
		return player.set(deckType, ArrayUtils.shuffleImmutable(player.get(deckType)));
	}

	public static discardHand(player: ImmutableTablePlayerState): ImmutableTablePlayerState {
		return this.dealAllCardsFromDeckToDeck(player, "hand", "discard");
	}

	public static shuffleDiscardToDeck(player: ImmutableTablePlayerState): ImmutableTablePlayerState {
		player = this.dealAllCardsFromDeckToDeck(player, "discard", "deck");
		return this.shuffleDeck(player, "deck");
	}

	public static addCardToDiscard(player: ImmutableTablePlayerState, card: ImmutableCardState): ImmutableTablePlayerState {
		return player.set(
			"discard",
			DeckUtils.addCardsToTop(player.get("discard"), Immutable.fromJS([card])),
		);
	}

	public static convertPlayerToTablePlayer(player: ImmutablePlayerState, playerIndex: number, boardWidth: number, boardHeight: number): ImmutableTablePlayerState {
		const positions = this.getPlayerPosition(playerIndex, boardWidth, boardHeight);
		const tablePlayer = player as ImmutableTablePlayerState;

		const chars = player.get("chars");
		const tableChars = chars.map((char, c) => CharUtils.convertToTableChar(char, positions[c]));

		// FIXME: baaaad typing
		return tablePlayer.set("chars", tableChars as any);
	}

	public static countUnreadyPlayers(players: ImmutableTablePlayerStates): number {
		return players.reduce((playerCount, player) => {
			if (player) playerCount--;
			return playerCount;
		}, players.size);
	}

	public static countUnmovedCharacters(player: ImmutableTablePlayerState): number {
		return CharUtils.countUnmovedCharacters(player.get("chars"));
	}

	public static moveCharInPlayer(player: ImmutableTablePlayerState, charIndex: number, move: Vector2): ImmutableTablePlayerState {
		const char = CharUtils.moveChar(player.get("chars").get(charIndex), move);
		const chars = player.get("chars").set(charIndex, char);
		return player.set("chars", chars);
	}

	public static setAllCharMovedThisTurn(player: ImmutableTablePlayerState, movedThisTurn: boolean): ImmutableTablePlayerState {
		const chars = player.get("chars").map(char => char.set("movedThisTurn", movedThisTurn));
		return player.set("chars", chars as any);
	}

	public static setCharMovedThisTurn(player: ImmutableTablePlayerState, charIndex: number, movedThisTurn: boolean): ImmutableTablePlayerState {
		const char = player.get("chars").get(charIndex).set("movedThisTurn", movedThisTurn);
		const chars = player.get("chars").set(charIndex, char);
		return player.set("chars", chars);
	}

	public static allMovesTaken(player: ImmutableTablePlayerState): boolean {
		return player.get("chars").every(char => char.get("movedThisTurn"));
	}

	public static getPlayerPosition(playerIndex: number, boardWidth: number, boardHeight: number): CharPositions {
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