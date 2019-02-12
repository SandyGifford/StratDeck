import * as React from "react";
import EventDelegate, { GenericEventListener } from "../../utils/EventDelegate";
import Server from "../../connection/Server";

export type PopMessageListener = GenericEventListener<React.ReactNode>;
export type PopMessageCloseListener = GenericEventListener;
export type PopMessageClearListener = GenericEventListener;

Server.addGameResetListener(() => {
	PopMessenger.clear();
});

export default class PopMessenger {
	private static readonly messageDelegate = new EventDelegate<React.ReactNode>();
	private static readonly closeDelegate = new EventDelegate();
	private static readonly clearDelegate = new EventDelegate();

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

	public static clear(): void {
		this.clearDelegate.trigger();
	}

	public static addClearListener(listener: PopMessageClearListener): void {
		this.clearDelegate.addEventListener(listener);
	}

	public static removeClearListener(listener: PopMessageClearListener): void {
		this.clearDelegate.removeEventListener(listener);
	}
}