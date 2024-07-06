/* eslint-disable ava/no-ignored-test-files */
import {existsSync, readFileSync} from 'node:fs';
import {rm} from 'node:fs/promises';
import test from 'ava';
import {pause} from 'src/utils/time.js';
import {writeManifest} from './manifest-writer.js';

test.beforeEach(async () => {
	if (existsSync('out')) {
		await rm('out', {recursive: true});
		await pause(70);
	}
});

test.afterEach.always(async () => {
	if (existsSync('out')) {
		await rm('out', {recursive: true});
		await pause(70);
	}
});

test('writeManifest works', async t => {
	t.false(existsSync('out'));

	await writeManifest([
		{path: 'foo.txt', file: {type: 'raw', content: 'foo foo foo'}},
		{path: 'bar/bar.txt', file: {type: 'raw', content: 'bar bar bar'}},
		{path: 'bar/baz.txt', file: {type: 'raw', content: 'baz baz baz'}},
	], 'out');

	await pause(50);

	t.true(existsSync('out/foo.txt'), 'out/foo.txt should exist');
	t.true(existsSync('out/bar/bar.txt'), 'out/bar/bar.txt should exist');
	t.true(existsSync('out/bar/baz.txt'), 'out/bar/baz.txt should exist');
	t.is(readFileSync('out/foo.txt', 'utf8'), 'foo foo foo');
	t.is(readFileSync('out/bar/bar.txt', 'utf8'), 'bar bar bar');
	t.is(readFileSync('out/bar/baz.txt', 'utf8'), 'baz baz baz');
});
