import {existsSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';

export async function ensureDirectoryExists(path: string) {
	const directoryPath = path
		.split('/')
		.slice(0, -1)
		.join('/');

	if (!existsSync(directoryPath)) {
		await mkdir(directoryPath, {recursive: true});
	}
}
