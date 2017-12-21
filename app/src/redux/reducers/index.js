import { combineReducers } from 'redux';
import { setPublicToken } from './plaidReducers';

const rootReducer = combineReducers({
	plaid: setPublicToken
});

export default rootReducer;
