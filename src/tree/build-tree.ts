import type {KeyReference, TreeLeaf} from './types.js';

export function buildTree(root: TreeLeaf, keys: KeyReference[]): TreeLeaf {
	for (const key of keys) {
		// Start again from the root
		let branch = root;

		// Get key path segments
		const segments = key.key.split('/');
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
			const id = branch.id === '' ? segment : `${branch.id}/${segment}`;
			const newBranch = {id, key: segment, children: []};
			branch.children.push(newBranch);
			branch = newBranch;
		}

		// Finally push the actual end page
		branch.children.push({
			$id: key.$id,
			id: key.key,
			key: leaf,
			children: [],
		});
	}

	return root;
}
