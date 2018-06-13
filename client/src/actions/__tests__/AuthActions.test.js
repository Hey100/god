import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  RESET_AUTH_ERROR,
  FETCH_USER,
  GOOGLE_SIGN_UP
} from '../types';
import * as actions from '../AuthActions';
import { mockStore } from '../../testing/utils';

describe('async actions', () => {
  // describe('signIn', () => {
  //   it('has the correct type', async () => {
  // 		const obj = { email: 'topmt@zoomtown.com', password: 'password'}
  //     const store = mockStore();
  //     await store.dispatch(signIn(obj));
  //     const actions = store.getActions;
  // 		console.log(actions[0])
  //     expect(actions[0]).toEqual(AUTH_USER);
  //   });
  // });
});

describe('normal actions', () => {
  it('should create an action to create an auth error', () => {
    const text = 'Error';
    const expectedAction = {
      type: AUTH_ERROR,
      payload: text
    };
    expect(actions.authError(text)).toEqual(expectedAction);
  });

  it('should create an action to reset the auth error', () => {
    const expectedAction = {
      type: RESET_AUTH_ERROR
    };
    expect(actions.resetAuthError()).toEqual(expectedAction);
  });

  // it('should create an action that designates a google user', () => {
  //   const expectedAction = {
  //     type: GOOGLE_SIGN_UP
  //   };
  //   const store = mockStore({});
  //   return store.dispatch(actions.openAuthSignUp()).then(() => {
  //     expect(store.getActions()).toEqual(expectedAction);
  //   });
  // });
});
