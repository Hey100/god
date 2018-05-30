import axios from 'axios';
import { AUTH_ERROR, UPDATED_USER, FETCH_USER, CURRENT_EMAIL } from './types';

export const saveUpdatedUserInfo = values => async dispatch => {
  try {
    const res = await axios.post('/api/changeuserinfo', values, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    if (res.data.user) {
      dispatch({
        type: AUTH_ERROR,
        payload:
          'This email is associated with a Google account. Your email and password cannot be changed.'
      });
    } else if (res.data.activeUser) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'New email is already associated with an active account'
      });
    } else {
      dispatch({
        type: UPDATED_USER,
        payload: 'Your account has been successfully updated'
      });
      dispatch({ type: FETCH_USER, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Current Password' });
  }
};

export const setCurrentEmail = email => {
  return {
    type: CURRENT_EMAIL,
    payload: email
  };
};
