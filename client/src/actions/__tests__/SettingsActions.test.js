import { AUTH_ERROR, UPDATED_USER, FETCH_USER, CURRENT_EMAIL } from '../types';
import * as actions from '../SettingsActions';
import moxios from 'moxios';
import { mockStore } from '../../testing/utils';

describe('async/redux action creators', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('SUCCESSFULLY updates and saves the new user info', done => {
    const res = {
      data: { user: 'updatedUser test' }
    };
    const store = mockStore({});
    moxios.stubRequest('/api/changeuserinfo', {
      status: 200,
      response: res
    });
    const expectedAction = [
      {
        type: UPDATED_USER,
        payload: 'Your account has been successfully updated'
      },
      {
        type: FETCH_USER,
        payload: res
      }
    ];
    return store.dispatch(actions.saveUpdatedUserInfo({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('THROWS ERROR when current password is incorrect', () => {
    const store = mockStore({});
    moxios.stubRequest('/api/changeuserinfo', {
      status: 404
    });
    const expectedAction = {
      type: AUTH_ERROR,
      payload: 'Invalid Current Password'
    };
    return store.dispatch(actions.saveUpdatedUserInfo({})).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('THROWS ERROR when a google user is trying to update', () => {
    const store = mockStore({});
    const res = { user: true };
    moxios.stubRequest('/api/changeuserinfo', {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: AUTH_ERROR,
      payload:
        'This email is associated with a Google account. Your email and password cannot be changed.'
    };

    return store.dispatch(actions.saveUpdatedUserInfo({})).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('THROWS ERROR when current user tries to change email to the email of an activeUser', () => {
    const store = mockStore({});
    const res = { activeUser: true };
    moxios.stubRequest('/api/changeuserinfo', {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: AUTH_ERROR,
      payload: 'New email is already associated with an active account'
    };

    return store.dispatch(actions.saveUpdatedUserInfo({})).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});

describe('normal action creators', () => {
  it('has an action creator for setting the current user email in the store', () => {
    const email = 'test@test.com';
    const expectedAction = {
      type: CURRENT_EMAIL,
      payload: email
    };
    expect(actions.setCurrentEmail(email)).toEqual(expectedAction);
  });
});
