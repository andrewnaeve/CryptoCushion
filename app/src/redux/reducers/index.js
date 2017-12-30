import { combineReducers } from 'redux';
import { setPlaidAccountInfo } from './plaidReducers';
import { setCoinbaseInfo } from './coinbaseReducers';

const rootReducer = combineReducers({
	plaid: setPlaidAccountInfo,
	coinbase: setCoinbaseInfo
});

export default rootReducer;
