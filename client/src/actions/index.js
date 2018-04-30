import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_USER } from './types';

export const onLogin = ({ email, password }, history) => {
  return dispatch => {
    axios
      .post('/api/login', { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: FETCH_USER, payload: res.data.user });
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Invalid Email/Password'));
      });
  };
};
export const onSignUp = (values, history) => {
  return dispatch => {
    axios
      .post('/api/signup', values)
      .then(res => {
				console.log(res)
				dispatch({ type: AUTH_USER });
				dispatch({ type: FETCH_USER, payload: res.data.user });
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const onLogOut = () => async dispatch => {
  localStorage.removeItem('token');
  const res = await axios.get('/api/logout');
  dispatch({ type: UNAUTH_USER });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
