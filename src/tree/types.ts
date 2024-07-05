
export type KeyReference = {
	$id: string;
	key: string;
};

export type TreeLeaf = {
	/**
	 * The ID from the JSON Schema Doc
	 */
	$id?: string;
	id: string;
	key: string;
	children: TreeLeaf[];
};
