export const APP_READY = 'APP_READY';

export const appReady = ready => {
	return dispatch => {
		dispatch({ type: APP_READY, payload: ready });
	};
};
