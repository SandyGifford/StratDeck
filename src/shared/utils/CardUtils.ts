import { CardType, ImmutableCardState, CardState } from "@typings/game";

import * as Uuid from "uuid";
import * as Immutable from "immutable";

export default class CardUtils {

	/**
	 * Creates an Immutable CardState from card type.  Generates random UID for it
	 * @param type The type of the card
	 * @returns A new Immutable CardState with type type
	 */
	public static createImmutableCard(type: CardType): ImmutableCardState {
		return Immutable.fromJS(this.createCard(type));
	}

	/**
	 * Creates a CardState from card type.  Generates random UID for it
	 * @param type The type of the card
	 * @returns A new CardState with type type
	 */
	public static createCard(type: CardType): CardState {
		return {
			type: type,
			uid: Uuid.v4(),
		};
	}
}