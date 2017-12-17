import { SHOW_PLAID } from '../actions/plaid-actions';
import { combineReducers } from 'redux';
import initialState from '../initialState';

export const plaidReducer = (state = initialState.plaid, action) => {
	switch (action.type) {
		case SHOW_PLAID:
			return {
				...state,
				showPlaidModal: action.payload
			};
		default:
			return state;
	}
};

// export default combineReducers({
// 	plaid: plaidReducer
// });
