import test from 'ava';
import webpack from 'webpack';
import tempy from 'tempy';
import pify from 'pify';

test(async t => {
	const config = require('./fixture/webpack.config');
	const cwd = tempy.directory();
	config.output.path = cwd;
	await pify(webpack)(config);
	t.is(require(cwd), '🦄');
});
