/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {renderFile} from './render-file.js';

test('renders raw', async t => {
	t.is(
		await renderFile({type: 'raw', content: 'foo bar'}),
		'foo bar',
	);
});

test('renders json', async t => {
	t.is(
		await renderFile({type: 'json', content: {foo: 'bar'}}),
		'{"foo":"bar"}',
	);
});

test('renders markdown with no front matter', async t => {
	t.is(
		await renderFile({type: 'markdown', content: '# foo\n\nbar baz\n'}),
		'# foo\n\nbar baz\n',
	);
});

test('renders markdown with front matter', async t => {
	t.is(
		await renderFile({type: 'markdown', content: '# foo\n\nbar baz\n', frontMatter: {monkeys: 'ooh aah'}}),
		'---\n{"monkeys":"ooh aah"}\n---\n\n# foo\n\nbar baz\n',
	);
});
