export default class ObjectUtils {
	public static forEach<T extends { [key in K]: T[K] }, K extends keyof T>(obj: T, act: (key: K, value: T[K], index: number, obj: T) => void): void {
		Object.keys(obj).forEach((key, index) => act(key as K, obj[key as K], index, obj))
	}

	public static map<T extends { [key in K]: T[K] }, K extends keyof T, R>(obj: T, act: (key: K, value: T[K], index: number, obj: T) => R): R[] {
		return Object.keys(obj).map((key, index) => act(key as K, obj[key as K], index, obj))
	}
}
