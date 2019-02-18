const path = require("path");

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
		alias: {
			"@typings": path.resolve(__dirname, "src/shared/typings/"),
			"@shared": path.resolve(__dirname, "src/shared/"),
			"@components": path.resolve(__dirname, "src/client/components/"),
			"@client": path.resolve(__dirname, "src/client/"),
			"@server": path.resolve(__dirname, "src/server/"),
		},
	},
	devtool: "source-map",
});