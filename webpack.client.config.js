const nodeExternals = require('webpack-node-externals');
const path = require("path");
const makeWebpack = require("./makeWebpack");

module.exports = {
	...makeWebpack(
		{
			client: "./src/client/index.tsx",
		},
		[
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
		]
	),
};