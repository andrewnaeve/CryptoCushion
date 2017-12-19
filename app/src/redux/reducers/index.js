import { combineReducers } from 'redux';
import { plaidReducer } from './plaid-reducers';

const rootReducer = combineReducers({
	plaid: plaidReducer
});

export default rootReducer;
