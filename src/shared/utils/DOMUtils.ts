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
}