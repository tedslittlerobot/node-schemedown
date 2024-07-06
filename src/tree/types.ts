
export type KeyReference = {
	$id: string;
	key: string;
};

export type TreeLeaf = {
	/**
	 * The ID from the JSON Schema Doc. Undefined if there is no corresponding doc.
	 */
	$id?: string;

	/**
	 * The full path of the item in the heirarchy.
	 */
	path: string;

	/**
	 * The key of the item
	 */
	key: string;

	/**
	 * Child items
	 */
	children: TreeLeaf[];
};
