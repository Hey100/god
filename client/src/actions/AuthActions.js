import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  RESET_AUTH_ERROR,
  FETCH_USER,
  GOOGLE_SIGN_UP
} from './types';

export const signIn = ({ email, password }, history) => async dispatch => {
  try {
    const res = await axios.post('/api/signin', {
      email,
      password
    });
    dispatch({ type: AUTH_USER });
    dispatch(fetchUser(res.data.token));
    localStorage.setItem('token', res.data.token);
    history.push('/dashboard');
  } catch (error) {
    dispatch(authError('Invalid Email/Password'));
  }
};
export const oAuthSignIn = history => async dispatch => {
  try {
    const res = await axios.get('/api/signin');
    dispatch({ type: AUTH_USER });
    dispatch(fetchUser(res.data.token));
    localStorage.setItem('token', res.data.token);
    history.push('/dashboard');
  } catch (error) {
    dispatch(authError('Unexpected Error'));
  }
};

//Signup.js
export const onSignUp = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/signup', values);
    try {
      dispatch({ type: AUTH_USER });
      dispatch(fetchUser(res.data.token));
      localStorage.setItem('token', res.data.token);
      history.push('/dashboard');
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  } catch (error) {
    dispatch(authError(error.response.data));
  }
};
export const OAuthSignUp = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/oauthsignup', values);
    try {
      dispatch({ type: AUTH_USER });
      dispatch(fetchUser(res.data.token));
      localStorage.setItem('token', res.data.token);
      history.push('/dashboard');
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  } catch (error) {
    dispatch(authError(error.response.data));
  }
};
export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
export const resetAuthError = () => {
  return {
    type: RESET_AUTH_ERROR
  };
};

//Logout.js
export const onLogOut = () => async dispatch => {
  localStorage.removeItem('token');
  await axios.get('/api/logout');
  dispatch({ type: UNAUTH_USER });
};

//App.js
export const fetchUser = token => async dispatch => {
  const res = await axios.get('/api/current_user', {
    headers: { Authorization: token }
  });
  dispatch({ type: FETCH_USER, payload: res.data });
};

//GoogleToken.js
export const oAuthSignUp = history => dispatch => {
	history.push('/signup');
	dispatch({ type: GOOGLE_SIGN_UP });
};
