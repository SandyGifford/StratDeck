export type GenericEventListener<D = void> = (data: D) => void;

export default class EventDelegate<D = void> {
	private listeners: GenericEventListener<D>[] = [];

	public addEventListener(listener: GenericEventListener<D>): void {
		if (this.listeners.indexOf(listener) === -1)
			this.listeners.push(listener);
		else
			console.warn("Listner was already added.");
	}

	public removeEventListener(listener: GenericEventListener<D>): void {
		const index = this.listeners.indexOf(listener);

		if (index !== -1)
			this.listeners.splice(index, 1);
	}

	public clearEventListeners(): void {
		this.listeners = [];
	}

	public trigger = (data: D) => {
		this.listeners.forEach(listener => listener(data));
	}

	public getListenerCount(): number {
		return this.listeners.length;
	}

	public hasListeners(): boolean {
		return this.listeners.length !== 0;
	}
}
