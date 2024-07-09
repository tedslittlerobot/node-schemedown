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
				file: {type: 'markdown', content: '# Root'},
			},
			{
				path: 'shop.md',
				file: {type: 'markdown', content: '# Shop'},
			},
			{
				path: 'pets/index.md',
				file: {type: 'markdown', content: '# Pets (leaf)'},
			},
			{
				path: 'pets/cat/index.md',
				file: {type: 'markdown', content: '# Cat'},
			},
			{
				path: 'pets/cat/coat_colour.md',
				file: {type: 'markdown', content: '# Coat Colour'},
			},
			{
				path: 'pets/dog/index.md',
				file: {type: 'markdown', content: '# Dog'},
			},
			{
				path: 'pets/dog/coat_colour.md',
				file: {type: 'markdown', content: '# Coat Colour'},
			},
		],
	);
});
