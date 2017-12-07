# add-module-exports-webpack-plugin [![Build Status](https://travis-ci.org/sindresorhus/add-module-exports-webpack-plugin.svg?branch=master)](https://travis-ci.org/sindresorhus/add-module-exports-webpack-plugin)

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


## Related

- [add-asset-webpack-plugin](https://github.com/sindresorhus/add-asset-webpack-plugin) - Dynamically add an asset to the webpack graph


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
