import { FETCH_USER, FETCHED_PAYMENTS, FETCHED_PROFILE } from '../types';
import { mockStore } from '../../testing/utils';
import moxios from 'moxios';
import * as actions from '../ProfileActions';

describe('async action creators', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('has an action creator for fetching all the payments for the current user', done => {
    const res = { 1: 'payment1', 2: 'payment2' };
    const store = mockStore({});
    moxios.stubRequest('/api/payments', {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: FETCHED_PAYMENTS,
      payload: res
    };

    return store.dispatch(actions.fetchPayments()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    });
  });

  it('has an action creator for fetching a selected user profile', done => {
    const id = '5b11ef490e310910913937b2';
    const store = mockStore({});
    const res = { name: 'username', userpic: '.png' };
    moxios.stubRequest(`/api/fetchprofile/${id}`, {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: FETCHED_PROFILE,
      payload: res
    };

    return store.dispatch(actions.fetchProfile(id)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    });
  });

  it('has an action creator for fetching a selected user profile', () => {
    const store = mockStore({});
    const res = { name: 'username', userpic: '.png' };
    moxios.stubRequest('/api/calculateLimit', {
      status: 200,
      response: res
    });

    //other moxios approach

    // moxios.wait(() => {
    //   const req = moxios.requests.mostRecent();
    //   req.respondWith({
    //     status: 200,
    //     response: res
    //   });
    // });
    const expectedAction = [
      {
        type: FETCH_USER,
        payload: res
      }
    ];

    return store.dispatch(actions.calculateLimit({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  // it('has an action creator for calculating the monthly limit of a user', done => {
  //   const store = mockStore({});
  //   const res = { _id: 'l3k4j5lkj2456lkj', first_name: 'Michael' };
  //   moxios.stubRequest('/api/calculateLimit', {}, {
  //     status: 200,
  //     response: res
  //   });
  //   const expectedAction = {
  //     type: FETCH_USER,
  //     payload: res
  //   };
  // 	return store.dispatch(actions.calculateLimit()).then(() => {
  // 		expect(store.getActions()).toEqual([expectedAction]);
  // 		done();
  // 	});
  // });
});
