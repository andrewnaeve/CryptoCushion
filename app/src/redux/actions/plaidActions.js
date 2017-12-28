import axios from 'axios';
import config from '../../../config.json';

export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const setAccountInfo = info => {
	return {
		type: SET_ACCOUNT_INFO,
		payload: info
	};
};

export const PLAID_CONNECTED = 'PLAID_CONNECTED';
export const plaidConnected = responseObj => {
	const { api: { URL } } = config;
	return dispatch => {
		dispatch(setAccountInfo(responseObj));
		return axios
			.post(`${URL}/getAccessToken`, {
				publicToken: responseObj.public_token
			})
			.then(data => {
				//console.log('data from axios', data);
			})
			.catch(err => console.log('cash in token get err', err));
	};
};
