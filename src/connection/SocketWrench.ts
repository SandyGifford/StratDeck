import * as io from "socket.io-client";
const socket = io();

interface SocketWrenchMessage<D> {
	event: string;
	data: D;
	iD: number;
}

export default class SocketWrench<D = void, R = void> {
	private connectionId = 0;

	constructor(private event: string, private timeout = 10000) { }

	public emit(data: D): Promise<R> {
		const iD = this.connectionId++;

		const promise = new Promise<R>((resolve, reject) => {
			const outgoingMessage: SocketWrenchMessage<D> = {
				event: this.event,
				data: data,
				iD: iD,
			};

			socket.emit("SocketWrenchMessage", outgoingMessage);

			const onResponse = (incomingMessage: SocketWrenchMessage<R>) => {
				if (
					incomingMessage.event !== this.event ||
					incomingMessage.iD !== iD
				) return;

				socket.removeEventListener(this.event, onResponse);
				clearTimeout(timeout);
				resolve(incomingMessage.data);
			};

			const timeout = setTimeout(() => {
				socket.removeEventListener(this.event, onResponse);
				reject(`SocketWrench connection "${this.event}" (ID ${iD}) timed out`);
			}, this.timeout);

			socket.on("SocketWrenchMessage", onResponse);
		});

		return promise;
	}

	public static addEventListener(event: string, fn: Function): SocketIOClient.Emitter {
		return socket.addEventListener(event, fn);
	}

	public static removeEventListener(event: string, fn: Function): SocketIOClient.Emitter {
		return socket.removeEventListener(event, fn);
	}

	public static emit(event: string, ...args: any[]): SocketIOClient.Socket {
		return socket.emit(event, ...args);
	}
}
