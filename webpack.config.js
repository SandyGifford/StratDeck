const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		client: "./src/client/index.tsx",
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
		alias: {
			"@shared": path.resolve(__dirname, "src/shared/"),
			"@components": path.resolve(__dirname, "src/client/components/"),
			"@client": path.resolve(__dirname, "src/client/"),
			"@server": path.resolve(__dirname, "src/server/"),
		},
	},
	devtool: "source-map",
};