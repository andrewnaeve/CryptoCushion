import axios from 'axios';
import { API_URL } from './config';

export const UPDATE_PUBLIC_TOKEN = 'UPDATE_PUBLIC_TOKEN';
export const updatePublicToken = token => {
	return dispatch => {
		dispatch({ type: UPDATE_PUBLIC_TOKEN, payload: token });
	};
};

export const CASH_IN_TOKEN = 'CASH_IN_TOKEN';
export const cashInToken = token => {
	return dispatch => {
		dispatch(updatePublicToken(token));
		return axios
			.post(`${API_URL}/get_access_token`, {
				publicToken: token
			})
			.then(response => {
				console.log('response from axios', response);
			})
			.catch(err => console.log('cash in token get err', err));
	};
};
