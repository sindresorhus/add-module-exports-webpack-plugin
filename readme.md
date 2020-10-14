# add-module-exports-webpack-plugin [![Build Status](https://travis-ci.com/sindresorhus/add-module-exports-webpack-plugin.svg?branch=master)](https://travis-ci.com/github/sindresorhus/add-module-exports-webpack-plugin)

> Add `module.exports` for Babel and TypeScript compiled code

When you use ES2015 modules with Babel or have a default export in TypeScript, they generate code which requires you to import it with `require('x').default` in CommonJS instead of `require('x')`. This plugin enables the latter.

## Install

```
$ npm install add-module-exports-webpack-plugin
```

## Usage

```js
const AddModuleExportsPlugin = require('add-module-exports-webpack-plugin');

module.exports = {
	// …
	output: {
		filename: 'dist/index.js',
		libraryTarget: 'commonjs2'
	},
	plugins: [
		new AddModuleExportsPlugin()
	]
};
```

**`output.libraryTarget` must be `commonjs2`**

### Primitive default exports

When exporting a primitive value as default export, other exported values will not be exported anymore. The reason is that this module redeclares the exports as follows.

```js
module.exports.default = (arg1, arg2) => arg1 + arg2;
module.exports.subtract = (arg1, arg2) => arg1 - arg2;
```

This module re-exports them as follows.

```js
module.exports = (arg1, arg2) => arg1 + arg2;
module.exports.default = (arg1, arg2) => arg1 + arg2;
module.exports.subtract = (arg1, arg2) => arg1 - arg2;
```

Because you can't attach properties to a primitive value, it's not possible to re-export the other properties and so you would end up with only a `module.exports`.

## Related

- [node-env-webpack-plugin](https://github.com/sindresorhus/node-env-webpack-plugin) - Simplified `NODE_ENV` handling
- [add-asset-webpack-plugin](https://github.com/sindresorhus/add-asset-webpack-plugin) - Dynamically add an asset to the webpack graph
