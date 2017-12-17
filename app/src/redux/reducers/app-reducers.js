import { APP_READY } from '../actions/app-actions';
import { combineReducers } from 'redux';
import initialState from '../initialState';

export const appIsReadyReducer = (state = initialState.app, action) => {
	const ready = action.payload;
	switch (action.type) {
		case APP_READY:
			return {
				...state,
				appIsReady: action.payload
			};
		default:
			return state;
	}
};

// export default combineReducers({
// 	app: appIsReadyReducer
// });
