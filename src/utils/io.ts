import {existsSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import {type Schema} from '../types.js';
import {getJsonFiles, loadJson} from './json.js';

export async function getSchemasFromDirectory(source: string): Promise<Schema[]> {
	const files = await getJsonFiles(source);

	if (files.length === 0) {
		throw new Error(`Cannot find any JSON schemas in ${source}`);
	}

	return Promise.all(files.map(async file => loadJson(file)));
}

export async function ensureDirectoryExists(path: string) {
	const directoryPath = path
		.split('/')
		.slice(0, -1)
		.join('/');

	if (!existsSync(directoryPath)) {
		await mkdir(directoryPath, {recursive: true});
	}
}
