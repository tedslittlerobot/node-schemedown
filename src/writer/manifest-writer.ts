import {writeFile} from 'node:fs/promises';
import {ensureDirectoryExists} from 'src/utils/io.js';
import type {RenderManifest, RenderableFile} from 'src/writer/types.js';

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

export async function renderFile(file: RenderableFile): Promise<string> {
	switch (file.type) {
		case 'raw': {
			return file.content;
		}

		case 'json': {
			return JSON.stringify(file.content);
		}

		case 'markdown': {
			if (file.frontMatter && Object.keys(file.frontMatter).length > 0) {
				return `---
${JSON.stringify(file.frontMatter)}
---

${file.content}`;
			}

			return file.content;
		}
	}
}
