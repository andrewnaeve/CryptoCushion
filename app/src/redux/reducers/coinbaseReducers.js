import { SET_COINBASE_INFO } from '../actions/coinbaseActions';
import initialState from '../initialState';

export const setCoinbaseInfo = (state = initialState.coinbase, action) => {
	console.log(action.type);
	switch (action.type) {
		case SET_COINBASE_INFO:
			console.log('wahttp', action.payload.code);
			return {
				...state,
				code: action.payload.code
			};
		default:
			return state;
	}
};
