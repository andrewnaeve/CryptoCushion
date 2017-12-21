import { SET_PUBLIC_TOKEN } from '../actions/plaidActions';
import { combineReducers } from 'redux';
import initialState from '../initialState';

export const setPublicToken = (state = initialState.plaid, action) => {
	switch (action.type) {
		case SET_PUBLIC_TOKEN:
			return {
				...state,
				publicToken: action.payload.publicToken
			};
		default:
			return state;
	}
};
