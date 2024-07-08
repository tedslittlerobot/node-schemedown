import {makeDocumentKeyList} from './key-list.js';
import type {KeyReference, SchemaSupply, SchemaUriNode} from './types.js';
import {makeNode} from './node.js';

export function treeify(schemas: SchemaSupply) {
	const [rootKey, keys] = makeDocumentKeyList(Object.keys(schemas.documents));

	const root = makeNode(rootKey.$id, schemas, {path: '', key: ''});

	return buildTreeOntoRootNode(root, keys, schemas);
}

export function buildTreeOntoRootNode(root: SchemaUriNode, keys: KeyReference[], schemas: SchemaSupply): SchemaUriNode {
	for (const reference of keys) {
		// Start again from the root
		let branch = root;

		// Get key path segments
		const segments = reference.key.split('/');
		// Pop the last segment as that is the actual relevant key
		const leaf = segments.pop()!;

		for (const segment of segments) {
			const child = branch.children.find(({key}) => key === segment);

			// If the child exists, set it and move on
			if (child) {
				branch = child;
				continue;
			}

			// Otherwise, make a leaf with no $id
			const newBranch = makeNode(
				undefined,
				schemas,
				{
					key: segment,
					path: branch.path === '' ? segment : `${branch.path}/${segment}`,
				},
			);

			branch.children.push(newBranch);
			branch = newBranch;
		}

		// Finally push the actual end page
		branch.children.push(
			makeNode(
				reference.$id,
				schemas,
				{
					path: reference.key,
					key: leaf,
				},
			),
		);
	}

	return root;
}
