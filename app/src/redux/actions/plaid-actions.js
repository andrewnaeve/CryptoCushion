export const UPDATE_publicToken = 'UPDATE_publicToken';

export const updatePublicToken = publicToken => {
	return dispatch => {
		dispatch({ type: UPDATE_publicToken, payload: publicToken });
	};
};
