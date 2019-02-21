///<reference path="../../../node_modules/immutable/dist/immutable.d.ts" />
import * as Immutable from "immutable";

// TODO: actual logic in Immutable is if the object has a constructor
export type ImmutablePrimitive = string | number | boolean | symbol | String | Number | Boolean | Symbol | Element;

export type ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME extends keyof MUTABLE_TYPE> = ImmutablePrimitiveSwitchValue<MUTABLE_TYPE[PROP_NAME]>;
export type ImmutablePrimitiveSwitchValue<VALUE_TYPE> = VALUE_TYPE extends ImmutablePrimitive ? VALUE_TYPE : Immutalizer<VALUE_TYPE>;

type Immutalizer<T> = T extends any[] ? ImmutalizerList<T> : ImmutalizerObject<T>;
export default Immutalizer;

export interface ImmutalizerObject<
	MUTABLE_TYPE,
	MUTABLE_KEYS extends keyof MUTABLE_TYPE = keyof MUTABLE_TYPE,
	> {
	size: number;
	isEmpty(): boolean;

	get<PROP_NAME extends MUTABLE_KEYS>(prop: PROP_NAME, notSetValue?: ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME>): ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME>;
	set<PROP_NAME extends MUTABLE_KEYS>(prop: PROP_NAME, value: ImmutablePrimitiveSwitch<MUTABLE_TYPE, PROP_NAME>): this;

	setIn(keyPath: [MUTABLE_KEYS, ...any[]], value: any): this;
	setIn(keyPath: Immutable.List<any>, value: any): this;

	toJS(): MUTABLE_TYPE;
	fromJS(obj: MUTABLE_TYPE): this;
}

export interface ImmutalizerList<
	MUTABLE_TYPE extends any[],
	VALUE_TYPE = MUTABLE_TYPE[number],
	> {
	size: number;
	isEmpty(): boolean;

	get(index: number, notSetValue?: ImmutablePrimitiveSwitchValue<VALUE_TYPE>): ImmutablePrimitiveSwitchValue<VALUE_TYPE>;
	set(index: number, value: ImmutablePrimitiveSwitchValue<VALUE_TYPE>): this;

	setIn(keyPath: [number, ...any[]], value: any): this;
	setIn(keyPath: Immutable.List<any>, value: any): this;

	slice(begin?: number, end?: number): this;
	push(...values: VALUE_TYPE[]): this;
	map<M>(mapper: (value: ImmutablePrimitiveSwitchValue<VALUE_TYPE>, key: number, iter: this) => M, context?: any): Immutable.List<M>;
	every(predicate: (value: ImmutablePrimitiveSwitchValue<VALUE_TYPE>, key: number, iter: this) => boolean, context?: any): boolean;
	last(notSetValue?: ImmutablePrimitiveSwitchValue<VALUE_TYPE>): ImmutablePrimitiveSwitchValue<VALUE_TYPE>;

	toJS(): MUTABLE_TYPE;
	fromJS(obj: MUTABLE_TYPE): this;
}
