import type {JSONSchema6, JSONSchema7} from 'json-schema';

export type Schema = (JSONSchema6 | JSONSchema7) & {
	'x-title'?: string;
	'x-description'?: string;
};

export type Options = {
	schemas: SchemaSource[];
};

export type SchemaSource = {
	name: string;
	source: string;
	destination: string;
	root?: string;
};
