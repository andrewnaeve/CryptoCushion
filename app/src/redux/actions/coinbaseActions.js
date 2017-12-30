import axios from 'axios';
import config from '../../../config.json';

export const SET_COINBASE_INFO = 'SET_COINBASE_INFO';
export const setCoinbaseInfo = payload => ({
	type: SET_COINBASE_INFO,
	payload: payload
});

export const COINBASE_CONNECTED = 'COINBASE_CONNECTED';
export const coinbaseConnected = payload => {
	const { api: { URL } } = config;
	return dispatch => {
		dispatch(setCoinbaseInfo(payload));
		return axios
			.post(`${URL}/getAccessToken`, {
				code: payload.code
			})
			.then(data => {
				//console.log('data from axios', data);
			})
			.catch(err => console.log('cash in token get err', err));
	};
};
