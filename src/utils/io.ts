import {type Schema} from '../types.js';
import {getJsonFiles, loadJson} from './json.js';

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
