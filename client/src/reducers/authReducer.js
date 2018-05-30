import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER,
  RESET_AUTH_ERROR,
  GOOGLE_SIGN_UP,
  UPDATED_USER,
  CURRENT_EMAIL
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  user: null,
	googleSignUp: false,
	success: '',
	currentEmail: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null, googleSignUp: false, error: '' };
    case FETCH_USER:
      return { ...state, user: action.payload };
    case RESET_AUTH_ERROR:
      return { ...state, error: '', googleSignUp: false, success: '' };
    case GOOGLE_SIGN_UP:
      return { ...state, googleSignUp: true };
    case UPDATED_USER:
      return { ...state, success: action.payload };
    case CURRENT_EMAIL:
      return { ...state, currentEmail: action.payload };
    default:
      return state;
  }
}
