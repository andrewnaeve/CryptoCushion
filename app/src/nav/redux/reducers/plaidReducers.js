import { SET_PLAID_ACCOUNT_INFO } from '../actions/plaidActions';
import initialState from '../initialState';

export const setPlaidAccountInfo = (state = initialState.plaid, action) => {
	switch (action.type) {
		case SET_PLAID_ACCOUNT_INFO:
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
