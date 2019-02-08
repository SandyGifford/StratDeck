import "./PopMessage.style";

import * as React from "react";
import PopMessenger, { PopMessageListener, PopMessageCloseListener } from "./PopMessenger";
import DOMUtils from "../../utils/DOMUtils";

export interface PopMessageProps { }
export interface PopMessageState {
	message: React.ReactNode;
	open: boolean;
}

export default class PopMessage extends React.PureComponent<PopMessageProps, PopMessageState> {
	constructor(props: PopMessageProps) {
		super(props);
		this.state = {
			message: null,
			open: false,
		};
	}

	public componentDidMount() {
		PopMessenger.addMessageListener(this.messageUpdated);
		PopMessenger.addCloseListener(this.closeMessage);
	}

	public componentWillUnmount() {
		PopMessenger.removeMessageListener(this.messageUpdated);
		PopMessenger.removeCloseListener(this.closeMessage);
	}

	public render(): React.ReactNode {
		const { open } = this.state;

		const className = DOMUtils.BEMClassName("PopMessage", {
			open: open,
		});
		return (
			<div className={className}>{this.state.message}</div>
		)
	}

	private messageUpdated: PopMessageListener = message => {
		this.setState({
			message: message,
			open: true,
		});
	};

	private closeMessage: PopMessageCloseListener = () => {
		this.setState({
			open: false,
		});
	};
}