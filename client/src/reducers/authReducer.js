import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER,
  RESET_AUTH_ERROR,
  GOOGLE_SIGN_UP
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  authenticated: false,
  user: null,
  googleSignUp: false
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
      return { ...state, error: '', googleSignUp: false };
		case GOOGLE_SIGN_UP:
      return { ...state, googleSignUp: true };
    default:
      return state;
  }
}
