import axios from 'axios';
import { API_URL } from './config';

export const SET_PUBLIC_TOKEN = 'SET_PUBLIC_TOKEN';
export const setPublicToken = token => {
	return dispatch => {
		dispatch({ type: SET_PUBLIC_TOKEN, payload: token });
	};
};

export const CASH_IN_TOKEN = 'CASH_IN_TOKEN';
export const cashInToken = token => {
	return dispatch => {
		dispatch(setPublicToken(token));
		return axios
			.post(`${API_URL}/getAccessToken`, {
				publicToken: token
			})
			.then(response => {
				console.log('response from axios', response);
			})
			.catch(err => console.log('cash in token get err', err));
	};
};
