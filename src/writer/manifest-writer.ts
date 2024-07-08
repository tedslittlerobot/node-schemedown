import {writeFile} from 'node:fs/promises';
import {renderFile} from 'src/render/render-file.js';
import {type RenderManifest} from 'src/render/types.js';
import {ensureDirectoryExists} from 'src/utils/io.js';

export async function writeManifest(manifest: RenderManifest, outDirectory: string) {
	for (const {path, file} of manifest) {
		const fullPath = constructFullPath(path, outDirectory);
		// eslint-disable-next-line no-await-in-loop
		const contents = await renderFile(file);

		// eslint-disable-next-line no-await-in-loop
		await ensureDirectoryExists(fullPath);

		// eslint-disable-next-line no-await-in-loop
		await writeFile(fullPath, contents, 'utf8');
	}
}

export function constructFullPath(path: string, outDirectory: string) {
	return `${outDirectory === '' ? '.' : outDirectory}/${path}`;
}
