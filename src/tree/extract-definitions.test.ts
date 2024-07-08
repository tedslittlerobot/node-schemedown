/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import {type Schema} from 'src/types.js';
import {extractDefinitions} from './extract-definitions.js';

test('gets no definitions from schema with no definitions', t => {
	t.is<Record<string, Schema> | undefined, Record<string, Schema> | undefined>(
		extractDefinitions({$id: 'foo'}),
		undefined,
	);
});

test('gets definitions from schema with one definition using definitions key', t => {
	t.deepEqual<Record<string, Schema> | undefined, Record<string, Schema> | undefined>(
		extractDefinitions({$id: 'foo', definitions: {monkeys: {type: 'string'}}}),
		{'foo#/definitions/monkeys': {type: 'string'}},
	);
});

test('gets definitions from schema with one definition using $defs key', t => {
	t.deepEqual<Record<string, Schema> | undefined, Record<string, Schema> | undefined>(
		extractDefinitions({$id: 'foo', $defs: {monkeys: {type: 'string'}}}),
		{'foo#/$defs/monkeys': {type: 'string'}},
	);
});
