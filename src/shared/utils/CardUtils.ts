import { CardType, ImmutableCardState, CardState } from "@typings/game";

import * as Immutable from "immutable";
import UidUtils from "./UidUtils";

export default class CardUtils {

	/**
	 * Creates an Immutable CardState from card type.  Generates random UID for it
	 * @param type The type of the card
	 * @returns A new Immutable CardState with type type
	 */
	public static createImmutableCard(type: CardType, uidSeed?: number): ImmutableCardState {
		return Immutable.fromJS(this.createCard(type, uidSeed));
	}

	/**
	 * Creates a CardState from card type.  Generates random UID for it
	 * @param type The type of the card
	 * @returns A new CardState with type type
	 */
	public static createCard(type: CardType, uidSeed?: number): CardState {
		return {
			type: type,
			uid: UidUtils.generate(uidSeed),
		};
	}
}