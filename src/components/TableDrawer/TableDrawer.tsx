import "./TableDrawer.style";

import * as React from "react";
import DOMUtils from "../../utils/DOMUtils";

export type TableDrawerSide = "top" | "left" | "right" | "bottom";
export type TableDrawerOpenState = "open" | "closed";

export interface TableDrawerProps {
	side: TableDrawerSide;
	forceState?: TableDrawerOpenState;
	noFill?: boolean;
}

export interface TableDrawerState {
	open: boolean;
}

export default class TableDrawer extends React.PureComponent<TableDrawerProps, TableDrawerState> {
	constructor(props: TableDrawerProps) {
		super(props);
		this.state = {
			open: false,
		};
	}

	public render(): React.ReactNode {
		const { children, forceState, side, noFill } = this.props;
		const { open } = this.state;

		const className = DOMUtils.BEMClassName("TableDrawer", {
			[`${side}Open`]: forceState ? forceState === "open" : open,
			fill: !noFill,
		}, side);

		return (
			<div className={className} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
				{children}
			</div>
		)
	}

	private onMouseOver = () => {
		this.setState({
			open: true,
		});
	};

	private onMouseOut = () => {
		this.setState({
			open: false,
		});
	};
}