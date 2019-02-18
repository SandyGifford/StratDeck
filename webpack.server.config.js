const nodeExternals = require('webpack-node-externals');
const path = require("path");
const makeWebpack = require("./makeWebpack");

module.exports = {
	...makeWebpack(
		{
			server: "./src/server/server.ts",
		}
	),
	target: "node",
	externals: [nodeExternals()],
	node: {
		__dirname: false
	},
	context: __dirname,
};