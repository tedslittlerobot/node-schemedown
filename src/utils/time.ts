
export const pause = async (ms: number) => new Promise(resolve => {
	setTimeout(resolve, ms);
});
