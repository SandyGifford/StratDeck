import * as Immutable from "immutable";
import { ImmutalizerList, ImmutalizerObject } from "@typings/immutalizer";

export default class ImmutableUtils {
	private static readonly EMPTY_MAP = Immutable.fromJS({});
	private static readonly EMPTY_LIST = Immutable.fromJS([]);

	public static emptyMap<T extends {}>(): ImmutalizerObject<T> {
		return this.EMPTY_MAP as ImmutalizerObject<T>;
	}

	public static emptyList<T extends []>(): ImmutalizerList<T> {
		return this.EMPTY_LIST as ImmutalizerList<T>;
	}
}