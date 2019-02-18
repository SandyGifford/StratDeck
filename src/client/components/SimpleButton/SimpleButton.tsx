import "./SimpleButton.style";

import * as React from "react";
import DOMUtils from "@utils/DOMUtils";

export type SimpleButtonClickHandler = () => void;

export interface SimpleButtonProps {
	onClick: SimpleButtonClickHandler;
	disabled?: boolean;
	className?: string;
}
export interface SimpleButtonState { }

export default class SimpleButton extends React.PureComponent<SimpleButtonProps, SimpleButtonState> {
	constructor(props: SimpleButtonProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { children, onClick, className, disabled } = this.props;

		const topClassName = DOMUtils.buildClassList(
			DOMUtils.BEMClassName("SimpleButton", {
				disabled: disabled,
			}),
			className
		);

		return (
			<div className={topClassName} onClick={onClick}>{children}</div>
		)
	}
}