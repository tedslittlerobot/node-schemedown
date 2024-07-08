/* eslint-disable ava/no-ignored-test-files */
import {existsSync, readFileSync} from 'node:fs';
import test from 'ava';
import {pause} from 'src/utils/time.js';
import {writeManifest} from './manifest-writer.js';

test('writeManifest works', async t => {
	const path = 'out/writer--manifest-writer';
	t.false(existsSync(path));

	await writeManifest([
		{path: 'foo.txt', file: {type: 'raw', content: 'foo foo foo'}},
		{path: 'bar/bar.txt', file: {type: 'raw', content: 'bar bar bar'}},
		{path: 'bar/baz.txt', file: {type: 'raw', content: 'baz baz baz'}},
	], path);

	await pause(50);

	t.true(existsSync(`${path}/foo.txt`), `${path}/foo.txt should exist`);
	t.true(existsSync(`${path}/bar/bar.txt`), `${path}/bar/bar.txt should exist`);
	t.true(existsSync(`${path}/bar/baz.txt`), `${path}/bar/baz.txt should exist`);
	t.is(readFileSync(`${path}/foo.txt`, 'utf8'), 'foo foo foo');
	t.is(readFileSync(`${path}/bar/bar.txt`, 'utf8'), 'bar bar bar');
	t.is(readFileSync(`${path}/bar/baz.txt`, 'utf8'), 'baz baz baz');
});
