/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import type {SchemaUriNode} from './types.js';
import {buildTreeOntoRootNode} from './treeify.js';
import {makeBlankNode} from './node.js';

test('builds empty tree onto root', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		buildTreeOntoRootNode(
			makeBlankNode('root'),
			[],
			{documents: {}, definitions: {}},
		),
		{
			$id: 'root',
			path: '',
			key: '',
			definition: undefined,
			definitions: [],
			children: [],
		},
	);
});

test('builds simple tree onto root', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		buildTreeOntoRootNode(
			makeBlankNode('root'),
			[
				{$id: 'root/foo', key: 'foo'},
				{$id: 'root/foo/bar', key: 'foo/bar'},
				{$id: 'root/baz', key: 'baz'},
			],
			{
				documents: {
					'root/foo': {$id: 'root/foo'},
					'root/foo/bar': {$id: 'root/foo/bar'},
					'root/baz': {$id: 'root/baz'},
				},
				definitions: {},
			},
		),
		{
			$id: 'root',
			path: '',
			key: '',
			definition: undefined,
			definitions: [],
			children: [
				{
					$id: 'root/foo',
					path: 'foo',
					key: 'foo',
					definition: undefined,
					definitions: [],
					children: [
						{
							$id: 'root/foo/bar',
							path: 'foo/bar',
							key: 'bar',
							definition: undefined,
							definitions: [],
							children: [],
						},
					],
				},
				{
					$id: 'root/baz',
					path: 'baz',
					key: 'baz',
					definition: undefined,
					definitions: [],
					children: [],
				},
			],
		},
	);
});

test('builds tree with one missing branch', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		buildTreeOntoRootNode(
			makeBlankNode('root'),
			[
				{$id: 'root/foo/bar', key: 'foo/bar'},
			],
			{
				documents: {
					root: {$id: 'root'},
					'root/foo/bar': {$id: 'root/foo/bar'},
				},
				definitions: {},
			},
		),
		{
			$id: 'root',
			path: '',
			key: '',
			definition: undefined,
			definitions: [],
			children: [
				{
					$id: undefined,
					path: 'foo',
					key: 'foo',
					definition: undefined,
					definitions: [],
					children: [
						{
							$id: 'root/foo/bar',
							path: 'foo/bar',
							key: 'bar',
							definition: undefined,
							definitions: [],
							children: [],
						},
					],
				},
			],
		},
	);
});

test('builds tree with many missing branches', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		buildTreeOntoRootNode(
			makeBlankNode('root'),
			[
				{$id: 'root/foo/bar/baz/monkeys', key: 'foo/bar/baz/monkeys'},
			],
			{
				documents: {
					root: {$id: 'root'},
					'root/foo/bar/baz/monkeys': {$id: 'root/foo/bar/baz/monkeys'},
				},
				definitions: {},
			},
		),
		{
			$id: 'root',
			path: '',
			key: '',
			definition: undefined,
			definitions: [],
			children: [
				{
					$id: undefined,
					path: 'foo',
					key: 'foo',
					definition: undefined,
					definitions: [],
					children: [
						{
							$id: undefined,
							path: 'foo/bar',
							key: 'bar',
							definition: undefined,
							definitions: [],
							children: [
								{
									$id: undefined,
									path: 'foo/bar/baz',
									key: 'baz',
									definition: undefined,
									definitions: [],
									children: [
										{
											$id: 'root/foo/bar/baz/monkeys',
											path: 'foo/bar/baz/monkeys',
											key: 'monkeys',
											definition: undefined,
											definitions: [],
											children: [],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	);
});

test('builds tree with missing branches and definitions', t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		buildTreeOntoRootNode(
			makeBlankNode('root'),
			[
				{$id: 'root/foo/bar', key: 'foo/bar'},
				{$id: 'root/baz', key: 'baz'},
			],
			{
				documents: {
					root: {$id: 'root'},
					'root/foo/bar': {$id: 'root/foo/bar', type: 'string'},
					'root/baz': {$id: 'root/baz', $defs: {monkey: {type: 'string'}}},
				},
				definitions: {
					'root/foo/bar': {$id: 'root/foo/bar', type: 'string'},
				},
			},
		),
		{
			$id: 'root',
			path: '',
			key: '',
			definition: undefined,
			definitions: [],
			children: [
				{
					$id: undefined,
					path: 'foo',
					key: 'foo',
					definition: undefined,
					definitions: [],
					children: [
						{
							$id: 'root/foo/bar',
							path: 'foo/bar',
							key: 'bar',
							definition: 'root/foo/bar',
							definitions: [],
							children: [],
						},
					],
				},
				{
					$id: 'root/baz',
					path: 'baz',
					key: 'baz',
					definition: undefined,
					definitions: ['root/baz#/$defs/monkey'],
					children: [],
				},
			],
		},
	);
});
