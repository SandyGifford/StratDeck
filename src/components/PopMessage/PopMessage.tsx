import "./PopMessage.style";

import * as React from "react";
import PopMessenger, { PopMessageListener, PopMessageCloseListener, PopMessageClearListener } from "./PopMessenger";
import DOMUtils from "../../utils/DOMUtils";

export interface PopMessageProps { }
export interface PopMessageState {
	open: boolean;
}

export default class PopMessage extends React.PureComponent<PopMessageProps, PopMessageState> {
	private messages: React.ReactNode[] = [];

	constructor(props: PopMessageProps) {
		super(props);
		this.state = {
			open: false,
		};
	}

	public componentDidMount() {
		PopMessenger.addMessageListener(this.messageUpdated);
		PopMessenger.addCloseListener(this.closeMessage);
		PopMessenger.addClearListener(this.clearMessages);
	}

	public componentWillUnmount() {
		PopMessenger.removeMessageListener(this.messageUpdated);
		PopMessenger.removeCloseListener(this.closeMessage);
		PopMessenger.removeClearListener(this.clearMessages);
	}

	public render(): React.ReactNode {
		const { open } = this.state;

		const className = DOMUtils.BEMClassName("PopMessage", {
			open: open,
		});
		return (
			<div className={className}>{this.messages.length ? this.messages[0] : null}</div>
		)
	}

	private messageUpdated: PopMessageListener = (message) => {
		setTimeout(() => {
			const { messages, state } = this;
			const { open } = state;

			messages.push(message);

			if (messages.length > 1) {
				if (open) {
					this.setState({
						open: false,
					});

					setTimeout(this.trimOneAndOpen, 500);
				} else {
					this.trimOneAndOpen();
				}
			} else {
				if (open) this.forceUpdate();
				else this.setState({
					open: true,
				});
			}
		})
	};

	private trimOneAndOpen = () => {
		this.messages = this.messages.slice(1);

		this.setState({
			open: true,
		});
	};

	private closeMessage: PopMessageCloseListener = () => {
		this.setState({
			open: false,
		});
	};

	private clearMessages: PopMessageClearListener = () => {
		this.messages = [];

		this.setState({
			open: false,
		});
	};
}