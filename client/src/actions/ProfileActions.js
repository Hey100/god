import axios from 'axios';
import { FETCH_USER, FETCHED_PAYMENTS, FETCHED_PROFILE } from './types';

//Summary.js
export const fetchPayments = () => async dispatch => {
	const res = await axios.get('/api/payments', {
		headers: { Authorization: localStorage.getItem('token') }
	});
	dispatch({ type: FETCHED_PAYMENTS, payload: res.data });
};

export const calculateLimit = obj => async dispatch => {
	const res = await axios.post('/api/calculateLimit', obj, {
		headers: { Authorization: localStorage.getItem('token') }
	});
	dispatch(fetchPayments());
	dispatch({ type: FETCH_USER, payload: res.data });
};

//Profile.js
export const fetchProfile = id => async dispatch => {
	const res = await axios.get(`/api/fetchprofile/${id}`, {
		headers: { Authorization: localStorage.getItem('token') }
	})
	dispatch({ type: FETCHED_PROFILE, payload: res.data})
}