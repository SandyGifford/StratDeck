export type DomLoopAction<R> = (ancestor: HTMLElement, index: number) => R;

export default class DOMUtils {
	/**
	 * Creates classnames for BEM
	 * @param className The base classname
	 * @param conditionalModifiers a map of modifiers and booleans
	 * @param modifiers static modifiers that are always added
	 * @returns A classname in the form "className className--modifier1 className--modifier2"
	 */
	public static BEMClassName(className: string, conditionalModifiers: { [mod: string]: boolean }, ...modifiers: string[]): string {
		return (
			Object.keys(conditionalModifiers).reduce((comb, mod) => conditionalModifiers[mod] ? `${comb} ${className}--${mod}` : comb, className) + " " +
			modifiers.map(mod => `${className}--${mod}`).join(" ")
		);
	}

	/**
	 * Creates a classname from a list, removing any falsey values
	 * @param classNames a list of class names
	 * @returns a classname
	 */
	public static buildClassList(...classNames: string[]): string {
		return classNames.reduce((aggregate, cn) => {
			if (cn) aggregate += ` ${cn}`;
			return aggregate;
		}, "");
	}

	public static forEachAncestor(element: HTMLElement, action: DomLoopAction<void>): void {
		for (let i = 0; element.parentElement; element = element.parentElement, i++) action(element, i);
	}

	public static everyAncestor(element: HTMLElement, action: DomLoopAction<boolean>): boolean {
		let cont = true;

		for (let i = 0; element.parentElement && cont; element = element.parentElement, i++) {
			cont = action(element, i);
		}

		return cont;
	}

	public static findAncestor(element: HTMLElement, action: DomLoopAction<boolean>): HTMLElement {
		let found: HTMLElement;

		this.everyAncestor(element, (ancestor, index) => {
			const didFind = action(ancestor, index);
			if (didFind) found = ancestor;
			return didFind;
		});

		return found;
	}

	public static findNearestAncestorWithStyle(element: HTMLElement, style: keyof CSSStyleDeclaration): HTMLElement {
		return this.findAncestor(element, (ancestor) => {
			return !!ancestor.style[style];
		});
	}
}