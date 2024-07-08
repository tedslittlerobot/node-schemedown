/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {getSchemasFromDirectory} from 'src/utils/io.js';
import {treeify} from './treeify.js';
import type {SchemaUriNode} from './types.js';
import {getSchemaSupply} from './get-schema-supply.js';

test('with petstore', async t => {
	t.deepEqual<SchemaUriNode, SchemaUriNode>(
		treeify(getSchemaSupply(await getSchemasFromDirectory('sample-schemas/petstore'))),
		{
			$id: 'schema://petstore',
			path: '',
			key: '',
			definition: undefined,
			definitions: ['schema://petstore#/$defs/shop'],
			children: [
				{
					$id: undefined,
					path: 'pets',
					key: 'pets',
					definition: undefined,
					definitions: [],
					children: [
						{
							$id: 'schema://petstore/pets/cat',
							path: 'pets/cat',
							key: 'cat',
							definition: 'schema://petstore/pets/cat',
							definitions: ['schema://petstore/pets/cat#/$defs/coat_colour'],
							children: [],
						},
						{
							$id: 'schema://petstore/pets/dog',
							path: 'pets/dog',
							key: 'dog',
							definition: 'schema://petstore/pets/dog',
							definitions: ['schema://petstore/pets/dog#/$defs/coat_colour'],
							children: [],
						},
					],
				},
			],
		},
	);
});
