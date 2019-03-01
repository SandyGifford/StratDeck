const path = require("path");
const tsconfig = require("./tsconfig")

const tsPaths = tsconfig.compilerOptions.paths;
const tsPathKeys = Object.keys(tsPaths)

const aliases = tsPathKeys.reduce((aliases, tsPathKey) => {
	const tsPath = tsPaths[tsPathKey];
	const aliasKey = tsPathKey.replace(/\/\*$/, "");
	aliases[aliasKey] = path.resolve(__dirname, tsPath[0].replace(/\/\*$/, ""));
	return aliases;
}, {});

module.exports = (entry, additionalRules) => ({
	mode: "development",
	entry: entry,
	output: {
		path: path.resolve(__dirname, "dist/build"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader"]
			},
			...(additionalRules || []),
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
		alias: aliases,
	},
	devtool: "source-map",
});