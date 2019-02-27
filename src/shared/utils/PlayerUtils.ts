import * as Immutable from "immutable";

import { CardType, ImmutableTablePlayerState, ImmutablePlayerState, ImmutableTablePlayerStates } from "@typings/game";
import DeckUtils from "@utils/DeckUtils";
import ArrayUtils from "@utils/ArrayUtils";
import { ImmutableTableCharacterDef, ImmutableTablePlayerCharacters } from "@typings/character";
import { ImmutableCharPositions } from "@typings/connection";
import { Vector2 } from "@typings/vector";

export type PlayerDeckType = "deck" | "hand" | "discard";

export default class PlayerUtils {
	public static dealCards(player: ImmutablePlayerState, cardCount: number): ImmutablePlayerState {
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

	public static dealCardsFromDeckToDeck(player: ImmutablePlayerState, fromDeck: PlayerDeckType, toDeck: PlayerDeckType, cardCount: number): ImmutablePlayerState {
		const fromTo = DeckUtils.dealCardsToDeck(player.get(fromDeck), player.get(toDeck), cardCount);
		player = player.set(fromDeck, fromTo.fromDeck);
		player = player.set(toDeck, fromTo.toDeck);
		return player;
	}

	public static dealAllCardsFromDeckToDeck(player: ImmutablePlayerState, fromDeck: PlayerDeckType, toDeck: PlayerDeckType): ImmutablePlayerState {
		return this.dealCardsFromDeckToDeck(player, fromDeck, toDeck, player.get(fromDeck).size);
	}

	public static shuffleDeck(player: ImmutablePlayerState, deck: PlayerDeckType): ImmutablePlayerState {
		return player.set(deck, ArrayUtils.shuffleImmutable(player.get(deck)));
	}

	public static discardHand(player: ImmutablePlayerState): ImmutablePlayerState {
		return this.dealAllCardsFromDeckToDeck(player, "hand", "discard");
	}

	public static shuffleDiscardToDeck(player: ImmutablePlayerState): ImmutablePlayerState {
		player = this.dealAllCardsFromDeckToDeck(player, "discard", "deck");
		return this.shuffleDeck(player, "deck");
	}

	public static addCardToDiscard(player: ImmutablePlayerState, card: CardType): ImmutablePlayerState {
		return player.set(
			"discard",
			DeckUtils.addCardsToTop(player.get("discard"), card),
		);
	}

	public static convertPlayerToTablePlayerInPlayers(players: ImmutableTablePlayerStates, playerIndex: number, player: ImmutablePlayerState, boardWidth: number, boardHeight: number): ImmutableTablePlayerStates {
		const tablePlayer = this.convertPlayerToTablePlayer(player, playerIndex, boardWidth, boardHeight);
		return players.set(playerIndex, tablePlayer);
	}

	public static convertPlayerToTablePlayer(player: ImmutablePlayerState, playerIndex: number, boardWidth: number, boardHeight: number): ImmutableTablePlayerState {
		const positions = this.getPlayerPosition(playerIndex, boardWidth, boardHeight);
		const tablePlayer = player as ImmutableTablePlayerState;

		const chars = player.get("chars");
		const tableChars = chars.map((char, c) => {
			const pos = positions.get(c);

			let tableChar = char as ImmutableTableCharacterDef;
			tableChar = tableChar.set("maxHP", char.get("hp"));
			tableChar = tableChar.set("x", pos.get("x"));
			tableChar = tableChar.set("y", pos.get("y"));
			return tableChar;
		});

		// FIXME: baaaad typing
		return tablePlayer.set("chars", tableChars as any);
	}

	public static countUnreadyPlayers(players: ImmutableTablePlayerStates): number {
		return players.reduce((playerCount, player) => {
			if (player) playerCount--;
			return playerCount;
		}, players.size);
	}

	public static moveCharInPlayers(players: ImmutableTablePlayerStates, playerIndex: number, charIndex: number, move: Vector2): ImmutableTablePlayerStates {
		const player = this.moveCharInPlayer(players.get(playerIndex), charIndex, move);
		return players.set(playerIndex, player);
	}

	public static moveCharInPlayer(player: ImmutableTablePlayerState, charIndex: number, move: Vector2): ImmutableTablePlayerState {
		const chars = this.moveCharInChars(player.get("chars"), charIndex, move);
		return player.set("chars", chars);
	}

	public static moveCharInChars(chars: ImmutableTablePlayerCharacters, charIndex: number, move: Vector2): ImmutableTablePlayerCharacters {
		const char = this.moveChar(chars.get(charIndex), move);
		return chars.set(charIndex, char);
	}

	public static moveChar(character: ImmutableTableCharacterDef, move: Vector2): ImmutableTableCharacterDef {
		return character.set("x", move.x).set("y", move.y);
	}

	public static getPlayerPosition(playerIndex: number, boardWidth: number, boardHeight: number): ImmutableCharPositions {
		switch (playerIndex) {
			case 0:
				return Immutable.fromJS([
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: 0, y: 2 },
				]);
			case 1:
				return Immutable.fromJS([
					{ x: boardWidth - 1, y: boardHeight - 1 },
					{ x: boardWidth - 1, y: boardHeight - 2 },
					{ x: boardWidth - 1, y: boardHeight - 3 },
				]);
			case 2:
				return Immutable.fromJS([
					{ x: 0, y: boardHeight - 1 },
					{ x: 1, y: boardHeight - 1 },
					{ x: 2, y: boardHeight - 1 },
				]);
			case 3:
				return Immutable.fromJS([
					{ x: boardWidth - 1, y: 0 },
					{ x: boardWidth - 2, y: 0 },
					{ x: boardWidth - 3, y: 0 },
				]);
			default:
				throw `Board does not support this many players.  Requested start location for player ${playerIndex + 1},  max player count is 2`;
		}
	}
}