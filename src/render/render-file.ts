import {type RenderableFile} from './types.js';

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
