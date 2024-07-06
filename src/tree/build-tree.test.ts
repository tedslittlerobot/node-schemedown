/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {buildTree} from './build-tree.js';
import type {TreeLeaf} from './types.js';

test('builds empty tree onto root', t => {
	t.deepEqual<TreeLeaf, TreeLeaf>(
		buildTree({
			$id: 'root',
			path: '',
			key: '',
			children: [],
		}, []),
		{
			$id: 'root',
			path: '',
			key: '',
			children: [],
		},
	);
});

test('builds simple tree onto root', t => {
	t.deepEqual<TreeLeaf, TreeLeaf>(
		buildTree({
			$id: 'root',
			path: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo', key: 'foo'},
			{$id: 'root/foo/bar', key: 'foo/bar'},
			{$id: 'root/baz', key: 'baz'},
		]),
		{
			$id: 'root',
			path: '',
			key: '',
			children: [
				{
					$id: 'root/foo',
					path: 'foo',
					key: 'foo',
					children: [
						{
							$id: 'root/foo/bar',
							path: 'foo/bar',
							key: 'bar',
							children: [],
						},
					],
				},
				{
					$id: 'root/baz',
					path: 'baz',
					key: 'baz',
					children: [],
				},
			],
		},
	);
});

test('builds tree with one missing branch', t => {
	t.deepEqual<TreeLeaf, TreeLeaf>(
		buildTree({
			$id: 'root',
			path: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo/bar', key: 'foo/bar'},
		]),
		{
			$id: 'root',
			path: '',
			key: '',
			children: [
				{
					path: 'foo',
					key: 'foo',
					children: [
						{
							$id: 'root/foo/bar',
							path: 'foo/bar',
							key: 'bar',
							children: [],
						},
					],
				},
			],
		},
	);
});

test('builds tree with many missing branches', t => {
	t.deepEqual<TreeLeaf, TreeLeaf>(
		buildTree({
			$id: 'root',
			path: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo/bar/baz/monkeys', key: 'foo/bar/baz/monkeys'},
		]),
		{
			$id: 'root',
			path: '',
			key: '',
			children: [
				{
					path: 'foo',
					key: 'foo',
					children: [
						{
							path: 'foo/bar',
							key: 'bar',
							children: [
								{
									path: 'foo/bar/baz',
									key: 'baz',
									children: [
										{
											$id: 'root/foo/bar/baz/monkeys',
											path: 'foo/bar/baz/monkeys',
											key: 'monkeys',
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

test('builds tree with missing branches', t => {
	t.deepEqual<TreeLeaf, TreeLeaf>(
		buildTree({
			$id: 'root',
			path: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo/bar', key: 'foo/bar'},
			{$id: 'root/baz', key: 'baz'},
		]),
		{
			$id: 'root',
			path: '',
			key: '',
			children: [
				{
					path: 'foo',
					key: 'foo',
					children: [
						{
							$id: 'root/foo/bar',
							path: 'foo/bar',
							key: 'bar',
							children: [],
						},
					],
				},
				{
					$id: 'root/baz',
					path: 'baz',
					key: 'baz',
					children: [],
				},
			],
		},
	);
});
