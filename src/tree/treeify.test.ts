/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {treeifyFromDirectory} from './treeify.js';
import type {TreeLeaf} from './types.js';

// Async arrow function
test('petstore', async t => {
	t.deepEqual<TreeLeaf, TreeLeaf>(
		await treeifyFromDirectory('sample-schemas/petstore', undefined),
		{
			$id: 'schema://petstore',
			path: '',
			key: '',
			children: [
				{
					path: 'pets',
					key: 'pets',
					children: [
						{
							$id: 'schema://petstore/pets/cat',
							path: 'pets/cat',
							key: 'cat',
							children: [],
						},
						{
							$id: 'schema://petstore/pets/dog',
							path: 'pets/dog',
							key: 'dog',
							children: [],
						},
					],
				},
			],
		},
	);
});
