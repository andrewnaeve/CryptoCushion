export const LINK_OBJECT_INFORMATION = 'LINK_OBJECT_INFORMATION';

export const linkObjectInformation = object => {
	return dispatch => {
		dispatch({ type: LINK_OBJECT_INFORMATION, payload: object });
	};
};
