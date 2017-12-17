import { combineReducers } from 'redux';
import { appIsReadyReducer } from './app-reducers';
import { plaidReducer } from './plaid-reducers';

const rootReducer = combineReducers({
	app: appIsReadyReducer,
	plaid: plaidReducer
});

export default rootReducer;
