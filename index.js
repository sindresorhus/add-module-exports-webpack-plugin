'use strict';
const webpack = require('webpack');
const {ConcatSource} = require('webpack-sources');

module.exports = class AddModuleExportsPlugin {
	_add(compilation, filename) {
		const source = `
const __export__ = module.exports;
module.exports = __export__.default;
Object.assign(module.exports, __export__);`;

		compilation.assets[filename] = new ConcatSource(compilation.assets[filename], source);
	}

	apply(compiler) {
		compiler.hooks.compilation.tap('AddModuleExportsPlugin', compilation => {
			const options = compilation.outputOptions;

			let libraryTarget;
			let hook;
			let callback;
			if (Number.parseInt(webpack.version, 10) >= 5) {
				libraryTarget = options.library.type;
				hook = compilation.hooks.processAssets;

				callback = (assets, options) => {
					for (const filename in assets) {
						if (Object.prototype.hasOwnProperty.call(assets, filename)) {
							if (filename === options.filename) {
								this._add(compilation, filename);
								break;
							}
						}
					}
				};
			} else {
				libraryTarget = options.libraryTarget;
				hook = compilation.hooks.optimizeChunkAssets;

				callback = (chunks, options) => {
					for (const chunk of chunks) {
						for (const filename of chunk.files) {
							if (filename === options.filename) {
								this._add(compilation, filename);
								break;
							}
						}
					}
				};
			}

			if (libraryTarget !== 'commonjs2') {
				compilation.errors.push(new Error('AddModuleExportsPlugin: output.libraryTarget must be `commonjs2`'));
				return;
			}

			hook.tap('AddModuleExportsPlugin', chunks => {
				callback(chunks, options);
			});
		});
	}
};
