'use strict';
const AddModuleExportsPlugin = require('..');

module.exports = {
	output: {
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	entry: __dirname,
	plugins: [
		new AddModuleExportsPlugin()
	]
};
