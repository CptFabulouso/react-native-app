export const updateFetchingState = {
	start: () => ({
		loading: true,
		loaded: false,
		error: null,
	}),
	success: () => ({
		loading: false,
		loaded: true,
		error: null,
	}),
	error: (error: string) => ({
		loading: false,
		loaded: false,
		error,
	}),
};
