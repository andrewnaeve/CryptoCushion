import axios from 'axios';
import config from '../../../config.json';

export const SET_PLAID_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const setPlaidAccountInfo = info => {
	return {
		type: SET_PLAID_ACCOUNT_INFO,
		payload: info
	};
};

export const PLAID_CONNECTED = 'PLAID_CONNECTED';
export const plaidConnected = responseObj => {
	const { api: { URL } } = config;
	return dispatch => {
		dispatch(setPlaidAccountInfo(responseObj));
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
