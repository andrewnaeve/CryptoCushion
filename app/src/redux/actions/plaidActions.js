import axios from 'axios';
import { API_URL } from './config';

export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const setAccountInfo = info => {
	return dispatch => {
		dispatch({ type: SET_ACCOUNT_INFO, payload: info });
	};
};

export const PLAID_CONNECTED = 'PLAID_CONNECTED';
export const plaidConnected = responseObj => {
	return dispatch => {
		dispatch(setAccountInfo(responseObj));
		return axios
			.post(`${API_URL}/getAccessToken`, {
				responseObj: responseObj
			})
			.then(data => {
				console.log('data from axios', data);
			})
			.catch(err => console.log('cash in token get err', err));
	};
};
