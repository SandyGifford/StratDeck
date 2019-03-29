import UidUtils from "./UidUtils";
import { GenericEventListener } from "./EventDelegate";

export default class KeyedEventDelegate<D = void> {
	private listeners: { [key: string]: GenericEventListener<D> } = {};

	public addEventListener(listener: GenericEventListener<D>, key?: string): string {
		key = key || UidUtils.generate();

		if (!this.listeners[key])
			this.listeners[key] = listener;
		else
			console.warn("Listner was already added.");

		return key;
	}

	public removeEventListener(key: string): void {
		if (this.listeners[key])
			delete this.listeners[key];
	}

	public clearEventListeners(): void {
		this.listeners = {};
	}

	public trigger = (key: string, data: D) => {
		this.listeners[key](data);
	}
}
