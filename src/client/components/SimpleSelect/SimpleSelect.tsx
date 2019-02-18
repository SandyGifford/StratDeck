import "./SimpleSelect.style";

import * as React from "react";
import DOMUtils from "@client/utils/DOMUtils";

export type SimpleSelectMakeLabel<S extends (string | number)> = (item: S) => string;
export type SimpleSelectChangedHandler<S extends (string | number)> = (item: S) => void;

export interface SimpleSelectProps<S extends (string | number)> {
	items: S[];
	value: S;
	makeLabel?: SimpleSelectMakeLabel<S>;
	onChange: SimpleSelectChangedHandler<S>;
	className?: string;
}
export interface SimpleSelectState { }

export default class SimpleSelect<S extends (string | number)> extends React.PureComponent<SimpleSelectProps<S>, SimpleSelectState> {
	constructor(props: SimpleSelectProps<S>) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		let { items, makeLabel, className, value } = this.props;
		makeLabel = makeLabel || (s => s) as SimpleSelectMakeLabel<S>;

		const topClassName = DOMUtils.buildClassList(
			"SimpleSelect",
			className
		);

		return (
			<select className={topClassName} onChange={this.onChange} value={value}>
				{
					items.map(item => <option className="SimpleSelect__option" key={item} value={item}>
						{makeLabel(item)}
					</option>)
				}
			</select>
		)
	}

	private onChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
		const value = typeof this.props.value === "string" ? e.target.value : parseFloat(e.target.value);

		this.props.onChange(value as S);
	};
}