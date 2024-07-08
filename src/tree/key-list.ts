import type {KeyReference} from './types.js';

export function makeDocumentKeyList(keys: string[]): [KeyReference, KeyReference[]] {
	keys = keys.sort();
	const rootKey = keys[0];

	const keyList: KeyReference[] = [];

	for (const $id of keys) {
		if (!$id.startsWith(rootKey)) {
			continue;
		}

		if ($id === rootKey) {
			keyList.push({$id, key: ''});
			continue;
		}

		let key = $id.slice(rootKey.length - $id.length);

		if (key.startsWith('/')) {
			key = key.slice(1);
		}

		keyList.push({$id, key});
	}

	const root = keyList.shift()!;

	return [root, keyList];
}
