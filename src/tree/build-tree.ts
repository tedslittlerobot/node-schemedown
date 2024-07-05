import type {KeyReference, TreeLeaf} from './types.js';

export function buildTree(root: TreeLeaf, keys: KeyReference[]) {
	for (const key of keys) {
		// Start again from the root
		let branch = root;

		// Get key path segments
		const segments = key.key.split('/');
		// Pop the last segment as that is the actual relevant key
		const leaf = segments.pop()!;

		for (const segment of segments) {
			const child = branch.children.find(({key}) => key === segment);

			if (child) {
				branch = child;
				continue;
			}

			const id = branch.id === '' ? segment : `${branch.id}/${segment}`;
			const newBranch = {id, key: segment, children: []};
			branch.children.push(newBranch);
			branch = newBranch;
		}

		branch.children.push({
			$id: key.$id,
			id: key.key,
			key: leaf,
			children: [],
		});
	}

	return root;
}
