/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import type {SchemaUriNode} from './types.js';
import {makeNode} from './node.js';

test('makes empty leaf node (no id)', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		makeNode(undefined, {documents: {}, definitions: {}}, {key: 'foo', path: 'bar'}),
		{
			$id: undefined,
			key: 'foo',
			path: 'bar',
			children: [],
			definition: undefined,
			definitions: [],
		},
	);
});

test('error trying to match id that does not exist', t => {
	t.throws(() => {
		makeNode('foobar', {documents: {}, definitions: {}}, {key: 'foo', path: 'bar'});
	});
});

test('makes node with document definition', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		makeNode('foobar', {documents: {foobar: {type: 'string'}}, definitions: {}}, {key: 'foo', path: 'bar'}),
		{
			$id: 'foobar',
			key: 'foo',
			path: 'bar',
			children: [],
			definition: 'foobar',
			definitions: [],
		},
	);
});

test('makes node with sub definition', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		makeNode(
			'foobar',
			{
				documents: {
					foobar: {$id: 'foobar', $defs: {foo: {type: 'string'}}},
				},
				definitions: {},
			},
			{key: 'foo', path: 'bar'},
		),
		{
			$id: 'foobar',
			key: 'foo',
			path: 'bar',
			children: [],
			definition: undefined,
			definitions: ['foobar#/$defs/foo'],
		},
	);
});
