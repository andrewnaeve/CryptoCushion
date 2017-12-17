export const SHOW_PLAID = 'SHOW_PLAID';

export const showPlaid = show => {
	return dispatch => {
		dispatch({ type: SHOW_PLAID, payload: show });
	};
};
