import { SET_ACCOUNT_INFO } from '../actions/plaidActions';
import { combineReducers } from 'redux';
import initialState from '../initialState';

export const setAccountInfo = (state = initialState.plaid, action) => {
	switch (action.type) {
		case SET_ACCOUNT_INFO:
			return {
				...state,
				accountInfo: {
					accounts: action.payload.accounts,
					institution: action.payload.institution,
					link_session_id: action.payload.link_session_id,
					public_token: action.payload.public_token
				}
			};
		default:
			return state;
	}
};
