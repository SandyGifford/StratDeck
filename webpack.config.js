const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/index.tsx",
	},
	output: {
		path: path.resolve(__dirname, "dist/build"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.tsx?$/,
				use: ["ts-loader"]
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
	},
	devtool: "source-map",
};