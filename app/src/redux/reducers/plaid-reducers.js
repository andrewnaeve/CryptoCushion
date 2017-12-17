import { LINK_OBJECT_INFORMATION } from '../actions/plaid-actions';
import { combineReducers } from 'redux';
import initialState from '../initialState';

export const plaidReducer = (state = initialState.plaid, action) => {
	console.log(action.payload);
	switch (action.type) {
		case LINK_OBJECT_INFORMATION:
			return {
				...state,
				linkObject: {
					account: {
						id: '',
						name: '',
						subtype: '',
						type: ''
					},
					account_id: '',
					accounts: [],
					institution: {
						institution_id: '',
						name: ''
					},
					link_session_id: '',
					public_token: action.payload.public_token
				}
			};
		default:
			return state;
	}
};

// export default combineReducers({
// 	plaid: plaidReducer
// });

// plaid: {
// 	linkObject: {
// 		account: {
// 			id: '',
// 			name: '',
// 			subtype: '',
// 			type: ''
// 		},
// 		account_id: '',
// 		accounts: [],
// 		institution: {
// 			institution_id: '',
// 			name: ''
// 		},
// 		link_session_id: '',
// 		public_token: ''
// 	}
// }
