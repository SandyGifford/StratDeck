import "./AbilityStatItem.style";

import * as React from "react";
import { CharacterAbility } from "@shared/typing/character";
import AbilityViewer from "@components/AbilityViewer/AbilityViewer";

export interface AbilityStatItemProps {
	ability: CharacterAbility;
}
export interface AbilityStatItemState {
	viewerVisible: boolean;
	viewerX: number;
	viewerY: number;
}

export default class AbilityStatItem extends React.PureComponent<AbilityStatItemProps, AbilityStatItemState> {
	constructor(props: AbilityStatItemProps) {
		super(props);
		this.state = {
			viewerVisible: false,
			viewerX: 0,
			viewerY: 0,
		};
	}

	public render(): React.ReactNode {
		const { ability } = this.props;
		const { viewerVisible, viewerX, viewerY } = this.state;

		return (
			<div className="AbilityStatItem" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
				<div className="AbilityStatItem__name">{ability.name}</div>
				<div className="AbilityStatItem__viewer" style={{
					left: viewerX,
					top: viewerY,
				}}>
					{
						viewerVisible ?
							<AbilityViewer ability={ability} /> : null
					}
				</div>
			</div>
		)
	}

	private mouseOver: React.MouseEventHandler<HTMLDivElement> = (e) => {
		const { currentTarget } = e;
		const rect = currentTarget.getBoundingClientRect();

		this.setState({
			viewerVisible: true,
			viewerX: rect.left + (rect.width / 2),
			viewerY: rect.bottom,
		})
	};

	private mouseOut: React.MouseEventHandler = (e) => {
		this.setState({
			viewerVisible: false
		})
	};
}