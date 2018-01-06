import { createStore, compose, applyMiddleware } from 'redux';
import { Platform } from 'react-native';
import initialState from './initialState';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
