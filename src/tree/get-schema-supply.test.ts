/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable ava/no-ignored-test-files */
import test from 'ava';
import type {SchemaSupply} from './types.js';
import {getSchemaSupply} from './get-schema-supply.js';

test('extracts nothing from empty list', t => {
	t.deepEqual<SchemaSupply, SchemaSupply>(
		getSchemaSupply([]),
		{
			documents: {},
			definitions: {},
		},
	);
});

test('extracts documents from simple list', t => {
	t.deepEqual<SchemaSupply, SchemaSupply>(
		getSchemaSupply([
			{$id: 'foo'},
			{$id: 'bar'},
		]),
		{
			documents: {
				foo: {$id: 'foo'},
				bar: {$id: 'bar'},
			},
			definitions: {},
		},
	);
});

test('extracts documents-level definitions from list', t => {
	t.deepEqual<SchemaSupply, SchemaSupply>(
		getSchemaSupply([
			{$id: 'foo', type: 'string'},
			{$id: 'bar'},
		]),
		{
			documents: {
				foo: {$id: 'foo', type: 'string'},
				bar: {$id: 'bar'},
			},
			definitions: {
				foo: {$id: 'foo', type: 'string'},
			},
		},
	);
});

test('extracts sub-level definitions from list', t => {
	t.deepEqual<SchemaSupply, SchemaSupply>(
		getSchemaSupply([
			{$id: 'foo', definitions: {monkeys: {type: 'string'}}},
			{$id: 'bar', $defs: {monkeys: {type: 'string'}}},
		]),
		{
			documents: {
				foo: {$id: 'foo', definitions: {monkeys: {type: 'string'}}},
				bar: {$id: 'bar', $defs: {monkeys: {type: 'string'}}},
			},
			definitions: {
				'foo#/definitions/monkeys': {type: 'string'},
				'bar#/$defs/monkeys': {type: 'string'},
			},
		},
	);
});
