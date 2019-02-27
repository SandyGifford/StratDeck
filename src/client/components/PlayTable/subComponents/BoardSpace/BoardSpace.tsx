import "./BoardSpace.style";

import * as React from "react";
import DOMUtils from "@utils/DOMUtils";

export interface BoardSpaceProps {
	x: number;
	y: number;
	charColor?: string;
	spaceColor?: string;
	canMove: boolean;
	charSelected?: boolean;
	onClick: () => void;
}
export interface BoardSpaceState {
}

export default class BoardSpace extends React.PureComponent<BoardSpaceProps, BoardSpaceState> {
	constructor(props: BoardSpaceProps) {
		super(props);
		this.state = {
		};
	}

	public render(): React.ReactNode {
		const { x, y, charColor, spaceColor, charSelected, onClick } = this.props;

		const centerClassName = DOMUtils.BEMClassName("BoardSpace__center", {
			selected: charSelected,
		});

		return (
			<div
				className="BoardSpace"
				style={{
					left: `${x * 3}em`,
					top: `${y * 3}em`,
					backgroundColor: spaceColor,
				}}
				onClick={onClick}>
				<div className={centerClassName} style={{
					backgroundColor: charSelected ? null : charColor,
					borderColor: charColor,
				}} />
			</div>
		)
	}
}