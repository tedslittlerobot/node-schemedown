/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {makeDocumentKeyList} from './key-list.js';

test('converts basic list', t => {
	t.deepEqual(
		makeDocumentKeyList([
			'root',
			'root/foo',
			'root/foo/foo',
			'root/foo/bar',
			'root/bar',
			'root/bar/foo',
			'root/bar/foo/bar',
			'root/baz/foo/bar',
		], undefined),
		[
			{$id: 'root', key: ''},
			{$id: 'root/bar', key: 'bar'},
			{$id: 'root/bar/foo', key: 'bar/foo'},
			{$id: 'root/bar/foo/bar', key: 'bar/foo/bar'},
			{$id: 'root/baz/foo/bar', key: 'baz/foo/bar'},
			{$id: 'root/foo', key: 'foo'},
			{$id: 'root/foo/bar', key: 'foo/bar'},
			{$id: 'root/foo/foo', key: 'foo/foo'},
		],
	);
});

test('converts basic list with given root, ignores things above that root', t => {
	t.deepEqual(
		makeDocumentKeyList([
			'root',
			'root/foo',
			'root/foo/foo',
			'root/foo/bar',
			'root/bar',
			'root/bar/foo',
			'root/bar/foo/bar',
			'root/baz/foo/bar',
		], 'root/foo'),
		[

			{$id: 'root/foo', key: ''},
			{$id: 'root/foo/bar', key: 'bar'},
			{$id: 'root/foo/foo', key: 'foo'},
		],
	);
});
