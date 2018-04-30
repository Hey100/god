import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_USER } from '../actions/types';

const INITIAL_STATE = {
	error: '',
	authenticated: null,
	user: null
}

export default function(state= INITIAL_STATE, action) {
	switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null };
    case FETCH_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}