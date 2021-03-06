import "./AbilityViewer.style";

import * as React from "react";
import { ImmutableCharacterAbility } from "@typings/character";

export interface AbilityViewerProps {
	ability: ImmutableCharacterAbility;
}
export interface AbilityViewerState { }

export default class AbilityViewer extends React.PureComponent<AbilityViewerProps, AbilityViewerState> {
	constructor(props: AbilityViewerProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { ability } = this.props;

		return (
			<div className="AbilityViewer">
				<div className="AbilityViewer__name">{ability.get("name")}</div>
				<div className="AbilityViewer__content">
					<div className="AbilityViewer__content__description">{ability.get("description")}</div>
					<div className="AbilityViewer__content__stats">
						<div className="AbilityViewer__content__stats__stat">
							<div className="AbilityViewer__content__stats__stat__name">use</div>
							<div className="AbilityViewer__content__stats__stat__value">{ability.get("use", "action")}</div>
						</div>
						<div className="AbilityViewer__content__stats__stat">
							<div className="AbilityViewer__content__stats__stat__name">range</div>
							<div className="AbilityViewer__content__stats__stat__value">{ability.get("range", 0) || "melee"}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}