/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {SchemaTree} from 'src/tree/tree.class.js';
import {type RenderManifest} from '../types.js';
import {SimpleRenderer} from './simple.js';

test('is correct', async t => {
	t.deepEqual<RenderManifest, RenderManifest>(
		await (new SimpleRenderer()).render(await SchemaTree.fromDirectory('sample-schemas/petstore')),
		[
			{
				path: 'index.md',
				file: {type: 'markdown', content: ['# Petstore', undefined]},
			},
			{
				path: 'shop.md',
				file: {type: 'markdown', content: ['# Shop', undefined]},
			},
			{
				path: 'pets/index.md',
				file: {type: 'markdown', content: '# Pets'},
			},
			{
				path: 'pets/cat/index.md',
				file: {type: 'markdown', content: ['# Cat', undefined]},
			},
			{
				path: 'pets/cat/coat_colour.md',
				file: {type: 'markdown', content: ['# Coat Colour', undefined]},
			},
			{
				path: 'pets/dog/index.md',
				file: {type: 'markdown', content: ['# Dog', undefined]},
			},
			{
				path: 'pets/dog/coat_colour.md',
				file: {type: 'markdown', content: ['# Coat Colour', undefined]},
			},
		],
	);
});
