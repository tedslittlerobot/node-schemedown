import {readFile, readdir} from 'node:fs/promises';
import {type Schema} from '../types.js';

export async function getJsonFiles(source: string): Promise<string[]> {
	const files = await readdir(source, {recursive: true});
	return files
		.filter(item => item.endsWith('.json'))
		.map(item => `${source}/${item}`);
}

export async function loadJson(source: string): Promise<Schema> {
	const contents = await readFile(source, 'utf8');

	if (!contents) {
		throw new Error(`No such file: ${source}`);
	}

	const json = JSON.parse(contents) as Schema;

	if (!json) {
		throw new Error(`Could not create JSON from file ${source}`);
	}

	return json;
}

export async function getSchemasFromDirectory(source: string): Promise<Record<string, Schema>> {
	const files = await getJsonFiles(source);

	if (files.length === 0) {
		throw new Error(`Cannot find any JSON schemas in ${source}`);
	}

	const schemas: Record<string, Schema> = {};

	for (const file of files) {
		// eslint-disable-next-line no-await-in-loop
		const schema = await loadJson(file);

		if (!schema.$id) {
			throw new Error(`Schema in file ${file} has no $id`);
		}

		schemas[schema.$id] = schema;
	}

	return schemas;
}
