import authReducer from '../authReducer';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER,
  RESET_AUTH_ERROR,
  GOOGLE_SIGN_UP,
  UPDATED_USER,
  CURRENT_EMAIL
} from '../../actions/types';

let INITIAL_STATE;
beforeEach(() => {
  INITIAL_STATE = {
    error: '',
    authenticated: false,
    user: null,
    googleSignUp: false,
    success: '',
    currentEmail: ''
  };
});

it('handles actions of type AUTH_USER', () => {
  const action = {
    type: AUTH_USER,
    payload: { error: '', authenticated: true }
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: action.payload.authenticated,
    currentEmail: '',
    error: action.payload.error,
    googleSignUp: false,
    success: '',
    user: null
  });
});

it('handles actions of type AUTH_ERROR', () => {
  const action = {
    type: AUTH_ERROR,
    payload: 'ERROR'
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: false,
    currentEmail: '',
    error: action.payload,
    googleSignUp: false,
    success: '',
    user: null
  });
});

it('handles actions fo type UNAUTH_USER', () => {
  const action = {
    type: UNAUTH_USER,
    payload: {
      authenticated: false,
      user: null,
      googleSignUp: false,
      error: ''
    }
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: action.payload.authenticated,
    currentEmail: '',
    error: action.payload.error,
    googleSignUp: action.payload.googleSignUp,
    success: '',
    user: action.payload.user
  });
});

it('handles actions of type FETCH_USER', () => {
  const action = {
    type: FETCH_USER,
    payload: {
      user: { name: 'test', email: 'test@test.com', password: 'password' }
    }
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: false,
    currentEmail: '',
    error: '',
    googleSignUp: false,
    success: '',
    user: action.payload
  });
});

it('handles actions of type RESET_AUTH_ERROR', () => {
  const action = {
    type: RESET_AUTH_ERROR,
    payload: { error: '', success: '' }
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: false,
    currentEmail: '',
    error: action.payload.error,
    googleSignUp: false,
    success: action.payload.success,
    user: null
  });
});

it('handles actions of type GOOGLE_SIGN_UP', () => {
  const action = {
    type: GOOGLE_SIGN_UP,
    payload: { googleSignUp: true }
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: false,
    currentEmail: '',
    error: '',
    googleSignUp: action.payload.googleSignUp,
    success: '',
    user: null
  });
});

it('handles actions of type UPDATED_USER', () => {
  const action = {
    type: UPDATED_USER,
    payload: 'User successfully updated'
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: false,
    currentEmail: '',
    error: '',
    googleSignUp: false,
    success: action.payload,
    user: null
  });
});

it('handles actions of type CURRENT_EMAIL', () => {
  const action = {
    type: CURRENT_EMAIL,
    payload: 'test@test.com'
  };
  const newState = authReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    authenticated: false,
    currentEmail: action.payload,
    error: '',
    googleSignUp: false,
    success: '',
    user: null
  });
});

it('handles action with unknown type', () => {
	const newState = authReducer(INITIAL_STATE, {});
  expect(newState).toEqual(INITIAL_STATE);
});
