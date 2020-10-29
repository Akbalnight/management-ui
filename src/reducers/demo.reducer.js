export const demo = (state = {}, action) => {
	switch (action.type) {
		case 'SET_CONFIGS':
			return {
				...state,
			};
		default:
			return state;
	}
};
