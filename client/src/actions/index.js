import axios from 'axios';
import { FETCH_USER } from './types';

export const onSignUp = (values, history) => async dispatch => {
	const res = axios.post('/api/signup', values);
	console.log('after axios', res)
  history.push('/dashboard');
  dispatch({ type: FETCH_USER, payload: res.data });
};
