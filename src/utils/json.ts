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
