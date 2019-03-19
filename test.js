import test from 'ava';
import webpack from 'webpack';
import tempy from 'tempy';
import pify from 'pify';

test('add module exports', async t => {
	const config = require('./fixture/webpack.config');
	const cwd = tempy.directory();
	config.output.path = cwd;
	await pify(webpack)(config);

	const unicorn = require(cwd);

	t.is(unicorn(), '🦄');
	t.is(unicorn.rainbow, '🌈');
});
