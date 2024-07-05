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
			id: '',
			key: '',
			children: [
				{
					id: 'pets',
					key: 'pets',
					children: [
						{
							$id: 'schema://petstore/pets/cat',
							id: 'pets/cat',
							key: 'cat',
							children: [],
						},
						{
							$id: 'schema://petstore/pets/dog',
							id: 'pets/dog',
							key: 'dog',
							children: [],
						},
					],
				},
			],
		},
	);
});
