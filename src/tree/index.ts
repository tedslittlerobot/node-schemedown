// import {type Schema} from '../types.js';
// import { buildTree } from './build-tree.js';
// import { makeDocumentKeyList } from './key-list.js';

// export function treeify(schemas: Record<string, Schema>, rootKey: string | undefined) {
// 	const keyList = makeDocumentKeyList(Object.keys(schemas), rootKey);

// 	const root = keyList.shift()!;

// 	const tree = buildTree({$id: root.$id, key: '', children: []}, keyList);

// 	console.info(JSON.stringify(tree, undefined, 2));
// }
