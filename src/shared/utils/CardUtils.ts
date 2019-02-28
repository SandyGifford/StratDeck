import { CardType, ImmutableCardState, CardState } from "@typings/game";

import * as Uuid from "uuid";
import * as Immutable from "immutable";

export default class CardUtils {
	public static createImmutableCard(type: CardType): ImmutableCardState {
		return Immutable.fromJS(this.createCard(type));
	}

	public static createCard(type: CardType): CardState {
		return {
			type: type,
			uid: Uuid.v4(),
		};
	}
}