export default class DOMUtils {
	public static BEMClassName(className: string, conditionalModifiers: { [mod: string]: boolean }, ...modifiers: string[]): string {
		return (
			Object.keys(conditionalModifiers).reduce((comb, mod) => conditionalModifiers[mod] ? `${comb} ${className}--${mod}` : comb, className) + " " +
			modifiers.map(mod => `${className}--${mod}`).join(" ")
		);
	}

	public static buildClassList(...classNames: string[]): string {
		return classNames.reduce((aggregate, cn) => {
			if (cn) aggregate += ` ${cn}`;
			return aggregate;
		}, "");
	}
}