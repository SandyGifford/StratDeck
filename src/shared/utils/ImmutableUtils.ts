import * as Immutable from "immutable";
import Immutalizer, { ImmutalizerList, ImmutalizerObject, ImmutablePrimitiveSwitchValue } from "@typings/immutalizer";

export default class ImmutableUtils {
	private static readonly EMPTY_MAP = Immutable.fromJS({});
	private static readonly EMPTY_LIST = Immutable.fromJS([]);

	public static plainMap<T, R>(imm: Immutalizer<T>, mapper: (value: ImmutablePrimitiveSwitchValue<T[keyof T]>, key: keyof T, iter: Immutalizer<T>) => R, context?: any): R[] {
		return (imm as any as Immutable.Map<any, any>).reduce((arr, value, key) => {
			arr.push(mapper(value, key, imm));
			return arr;
		}, [], context);
	}

	public static emptyMap<T extends {}>(): ImmutalizerObject<T> {
		return this.EMPTY_MAP as ImmutalizerObject<T>;
	}

	public static emptyList<T extends []>(): ImmutalizerList<T> {
		return this.EMPTY_LIST as ImmutalizerList<T>;
	}
}