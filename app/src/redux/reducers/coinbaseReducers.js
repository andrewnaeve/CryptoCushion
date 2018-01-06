import { SET_COINBASE_INFO } from '../actions/coinbaseActions';
import initialState from '../initialState';

export const setCoinbaseInfo = (state = initialState.coinbase, action) => {
	switch (action.type) {
		case SET_COINBASE_INFO:
			return {
				...state,
				code: action.payload.code
			};
		default:
			return state;
	}
};
