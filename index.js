'use strict';
const {ConcatSource} = require('webpack-sources');

module.exports = class AddModuleExportsPlugin {
	_add(compilation, filename) {
		const source = `
const __export__ = module.exports;
module.exports = __export__.default;
Object.assign(module.exports, __export__);`;

		compilation.assets[filename] = new ConcatSource(compilation.assets[filename], source);
	}

	_handleOptimizeChunkAssets(chunks, cb, compilation) {
		const options = compilation.outputOptions;

		for (const chunk of chunks) {
			for (const filename of chunk.files) {
				if (filename === options.filename) {
					this._add(compilation, filename);
					break;
				}
			}
		}

		cb();
	}

	_handleCompilation(compilation) {
		const options = compilation.outputOptions;

		if (options.libraryTarget !== 'commonjs2') {
			compilation.errors.push(new Error('AddModuleExportsPlugin: output.libraryTarget must be `commonjs2`'));
			return;
		}

		if (compilation.hooks) {
			compilation.hooks.optimizeChunkAssets.tapAsync('AddModuleExportsPlugin',
				(chunks, cb) => this._handleOptimizeChunkAssets(chunks, cb, compilation));
		} else {
			compilation.plugin('optimize-chunk-assets',
				(chunks, cb) => this._handleOptimizeChunkAssets(chunks, cb, compilation));
		}
	}

	apply(compiler) {
		if (compiler.hooks) {
			compiler.hooks.compilation.tap('AddModuleExportsPlugin', this._handleCompilation.bind(this));
		} else {
			compiler.plugin('compilation', this._handleCompilation.bind(this));
		}
	}
};
