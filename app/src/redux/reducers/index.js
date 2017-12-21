import { combineReducers } from 'redux';
import { setAccountInfo } from './plaidReducers';

const rootReducer = combineReducers({
	plaid: setAccountInfo
});

export default rootReducer;
