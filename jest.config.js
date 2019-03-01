const path = require("path");
const tsconfig = require("./tsconfig")

const tsPaths = tsconfig.compilerOptions.paths;
const tsPathKeys = Object.keys(tsPaths)

const moduleNameMapper = tsPathKeys.reduce((moduleNames, tsPathKey) => {
	const tsPath = tsPaths[tsPathKey];
	const moduleNameKey = `^${tsPathKey.replace(/\/\*$/, "(.*)$")}`;
	moduleNames[moduleNameKey] = `<rootDir>${tsPath[0].replace(/^\./, "").replace(/\/\*$/, "")}$1`;
	return moduleNames;
}, {});

module.exports = {
	"testRegex": ".*\\/__tests__\\/.*\\.test\\.(ts|js)$",
	"moduleFileExtensions": [
		"ts",
		"js"
	],
	"transform": {
		"\\.ts$": "ts-jest"
	},
	"moduleNameMapper": moduleNameMapper
};