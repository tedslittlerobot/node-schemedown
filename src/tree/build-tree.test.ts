/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {buildTree} from './build-tree.js';

test('builds empty tree onto root', t => {
	t.deepEqual(
		buildTree({
			$id: 'root',
			id: '',
			key: '',
			children: [],
		}, []),
		{
			$id: 'root',
			id: '',
			key: '',
			children: [],
		},
	);
});

test('builds simple tree onto root', t => {
	t.deepEqual(
		buildTree({
			$id: 'root',
			id: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo', key: 'foo'},
			{$id: 'root/foo/bar', key: 'foo/bar'},
			{$id: 'root/baz', key: 'baz'},
		]),
		{
			$id: 'root',
			id: '',
			key: '',
			children: [
				{
					$id: 'root/foo',
					id: 'foo',
					key: 'foo',
					children: [
						{
							$id: 'root/foo/bar',
							id: 'foo/bar',
							key: 'bar',
							children: [],
						},
					],
				},
				{
					$id: 'root/baz',
					id: 'baz',
					key: 'baz',
					children: [],
				},
			],
		},
	);
});

test('builds tree with one missing branch', t => {
	t.deepEqual(
		buildTree({
			$id: 'root',
			id: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo/bar', key: 'foo/bar'},
		]),
		{
			$id: 'root',
			id: '',
			key: '',
			children: [
				{
					id: 'foo',
					key: 'foo',
					children: [
						{
							$id: 'root/foo/bar',
							id: 'foo/bar',
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
	t.deepEqual(
		buildTree({
			$id: 'root',
			id: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo/bar/baz/monkeys', key: 'foo/bar/baz/monkeys'},
		]),
		{
			$id: 'root',
			id: '',
			key: '',
			children: [
				{
					id: 'foo',
					key: 'foo',
					children: [
						{
							id: 'foo/bar',
							key: 'bar',
							children: [
								{
									id: 'foo/bar/baz',
									key: 'baz',
									children: [
										{
											$id: 'root/foo/bar/baz/monkeys',
											id: 'foo/bar/baz/monkeys',
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
	t.deepEqual(
		buildTree({
			$id: 'root',
			id: '',
			key: '',
			children: [],
		}, [
			{$id: 'root/foo/bar', key: 'foo/bar'},
			{$id: 'root/baz', key: 'baz'},
		]),
		{
			$id: 'root',
			id: '',
			key: '',
			children: [
				{
					id: 'foo',
					key: 'foo',
					children: [
						{
							$id: 'root/foo/bar',
							id: 'foo/bar',
							key: 'bar',
							children: [],
						},
					],
				},
				{
					$id: 'root/baz',
					id: 'baz',
					key: 'baz',
					children: [],
				},
			],
		},
	);
});
