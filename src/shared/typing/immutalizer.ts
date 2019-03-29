///<reference path="../../../node_modules/immutable/dist/immutable.d.ts" />
import * as Immutable from "immutable";

declare module "immutable" {
	export function fromJS<T>(jsValue: T): Immutalizer<T>;
}

// TODO: actual logic in Immutable is if the object has a constructor
export type ImmutablePrimitive = Immutable.Map<unknown, unknown> | Immutable.List<unknown> | Immutalizer<unknown> | string | number | boolean | symbol | String | Number | Boolean | Symbol | Element;

export type ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME extends keyof MUTABLE_TYPE> = ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[PROP_NAME]>;
export type ImmutablePrimitiveSwitchValue<VALUE_TYPE> = VALUE_TYPE extends ImmutablePrimitive ? VALUE_TYPE : Immutalizer<VALUE_TYPE>;

type Immutalizer<T> = T extends any[] ? ImmutalizerList<T> : ImmutalizerObject<T>;
export default Immutalizer;

export interface ImmutalizerObject<
	MUTABLE_TYPE,
	> extends Immutable.Map<keyof MUTABLE_TYPE, ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[keyof MUTABLE_TYPE]>> {
	size: number;
	isEmpty(): boolean;

	get<PROP_NAME extends (keyof MUTABLE_TYPE)>(prop: PROP_NAME, notSetValue?: ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME>): ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME>;
	set<PROP_NAME extends (keyof MUTABLE_TYPE)>(prop: PROP_NAME, value: ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME>): this;

	setIn(keyPath: [(keyof MUTABLE_TYPE), ...any[]], value: any): this;
	setIn(keyPath: Immutable.List<any>, value: any): this;

	toJS(): MUTABLE_TYPE;
}

export interface ImmutalizerList<
	MUTABLE_TYPE extends any[],
	> extends Immutable.List<ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>> {
	size: number;
	isEmpty(): boolean;

	get(index: number, notSetValue?: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>): ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>;
	set(index: number, value: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>): this;

	setIn(keyPath: [number, ...any[]], value: any): this;
	setIn(keyPath: Immutable.List<any>, value: any): this;

	slice(begin?: number, end?: number): this;
	push(...values: MUTABLE_TYPE[number][]): this;
	map<M>(mapper: (value: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>, key: number, iter: this) => M, context?: any): Immutable.List<M>;
	every(predicate: (value: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>, key: number, iter: this) => boolean, context?: any): boolean;
	last(notSetValue?: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>): ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>;
	reduce<R>(
		reducer: (reduction: R, value: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>, key: number, iter: this) => R,
		initialReduction: R,
		context?: any
	): R;
	reduce<R>(
		reducer: (reduction: MUTABLE_TYPE[number] | R, value: MUTABLE_TYPE[number], key: number, iter: this) => R
	): R;
	concat(...valuesOrCollections: this[]): this;
	forEach(
		sideEffect: (value: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>, key: number, iter: this) => any,
		context?: any
	): number;


	find(
		predicate: (value: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>, key: number, iter: this) => boolean,
		context?: any,
		notSetValue?: ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]>
	): ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[number]> | undefined;

	toJS(): MUTABLE_TYPE;
}
