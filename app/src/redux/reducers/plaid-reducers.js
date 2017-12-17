import { UPDATE_publicToken } from '../actions/plaid-actions';
import { combineReducers } from 'redux';
import initialState from '../initialState';

export const plaidReducer = (state = initialState.plaid, action) => {
	switch (action.type) {
		case UPDATE_publicToken:
			return {
				...state,
				publicToken: action.payload.publicToken
			};
		default:
			return state;
	}
};
