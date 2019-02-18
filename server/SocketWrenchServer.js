module.exports = (io, handlers, options) => {
	handlers = handlers || {};
	options = {
		messageEvent: "SocketWrenchMessage",
		...options,
	};

	io.on("connection", socket => {
		console.log(`SocketWrench connection made (${socket.handshake.address})`);

		socket.on(options.messageEvent, incomingMessage => {
			console.log("SocketWrench message recieved", incomingMessage);

			const handler = handlers[incomingMessage.event];

			if (handler) {
				const resolve = (outgoingData) => {
					console.log("SocketWrench is responding");

					socket.emit(options.messageEvent, {
						...incomingMessage,
						data: outgoingData,
					});
				};

				handler(incomingMessage.data, resolve);
			} else {
				console.warn(`SocketWrench could not find a handler for event "${incomingMessage.event}"`);
			}
		});
	});
};
