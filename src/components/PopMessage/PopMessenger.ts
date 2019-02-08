import * as React from "react";
import EventDelegate, { GenericEventListener } from "../../utils/EventDelegate";

export type PopMessageListener = GenericEventListener<React.ReactNode>;
export type PopMessageCloseListener = GenericEventListener;

export default class PopMessenger {
	private static readonly messageDelegate = new EventDelegate<React.ReactNode>();
	private static readonly closeDelegate = new EventDelegate();

	public static message(node: React.ReactNode): void {
		this.messageDelegate.trigger(node);
	}

	public static addMessageListener(listener: PopMessageListener): void {
		this.messageDelegate.addEventListener(listener);
	}

	public static removeMessageListener(listener: PopMessageListener): void {
		this.messageDelegate.removeEventListener(listener);
	}

	public static close(): void {
		this.closeDelegate.trigger();
	}

	public static addCloseListener(listener: PopMessageCloseListener): void {
		this.closeDelegate.addEventListener(listener);
	}

	public static removeCloseListener(listener: PopMessageCloseListener): void {
		this.closeDelegate.removeEventListener(listener);
	}
}