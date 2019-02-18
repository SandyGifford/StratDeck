import "./Rotado.style";

import * as React from "react";

export type RotadoUnit = "rad" | "deg";

export interface RotadoProps<T extends HTMLElement> {
	angle: number;
	unit?: RotadoUnit;
	children: React.ReactElement<T>;
	watchResize?: boolean;
}
export interface RotadoState { }

export default class Rotado<T extends HTMLElement> extends React.PureComponent<RotadoProps<T>, RotadoState> {
	private readonly rootRef: React.RefObject<HTMLDivElement> = React.createRef();
	private readonly cloneRef: React.RefObject<T> = React.createRef();
	private readonly posRef: React.RefObject<HTMLDivElement> = React.createRef();

	constructor(props: RotadoProps<T>) {
		super(props);
		this.state = {};
	}

	public componentDidUpdate(): void {
		this.updateRotation();
	}

	public componentDidMount(): void {
		window.addEventListener("resize", this.onWindowResize);
		this.updateRotation();
	}

	public componentWillUnmount(): void {
		window.removeEventListener("resize", this.onWindowResize);
	}

	public render(): React.ReactNode {
		const { children, angle, unit } = this.props;

		if (!React.isValidElement(children)) throw "children must be singular valid React element";

		const cssRotation = `rotate(${angle}${unit || "deg"})`;
		const styleObj: React.CSSProperties = {
			transform: cssRotation,
		};

		const clone = React.cloneElement(children, {
			ref: this.cloneRef
		});

		const disp = React.cloneElement(children, {
			ref: children.props.ref
		});

		return (
			<div className="Rotado" ref={this.rootRef}>
				<div className="Rotado__clone">
					<div className="Rotado__clone__rot" style={styleObj}>
						{clone}
					</div>
				</div>
				<div className="Rotado__position" ref={this.posRef}>
					<div className="Rotado__position__rot" style={styleObj}>
						{disp}
					</div>
				</div>
			</div>
		)
	}

	private onWindowResize = () => {
		if (this.props.watchResize)
			this.forceUpdate();
	};

	private updateRotation() {
		const rootEl = this.rootRef.current;
		const cloneEl = this.cloneRef.current;
		const posEl = this.posRef.current;

		const rootRect = rootEl.getBoundingClientRect();
		const cloneRect = cloneEl.getBoundingClientRect();

		rootEl.style.width = `${cloneRect.width}px`;
		rootEl.style.height = `${cloneRect.height}px`;

		const offsetLeft = rootRect.left - cloneRect.left;
		const offsetTop = rootRect.top - cloneRect.top;

		posEl.style.left = `${offsetLeft}px`;
		posEl.style.top = `${offsetTop}px`;
	}
}