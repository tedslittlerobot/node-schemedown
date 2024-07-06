import {getSchemasFromDirectory} from 'src/utils/io.js';
import {type Schema} from 'src/types.js';
import {buildTree} from './build-tree.js';
import {makeDocumentKeyList} from './key-list.js';

export function treeify(schemas: Record<string, Schema>, rootKey: string | undefined) {
	const keyList = makeDocumentKeyList(Object.keys(schemas), rootKey);

	const root = keyList.shift()!;

	return buildTree({
		$id: root.$id,
		path: '',
		key: '',
		children: [],
	}, keyList);
}

export async function treeifyFromDirectory(source: string, rootKey: string | undefined) {
	const schemas = await getSchemasFromDirectory(source);

	return treeify(schemas, rootKey);
}
