import {
  FETCH_USER,
  MY_POOLS,
  ALL_POOLS,
  CHART_CREATED,
  COMMENT_CREATED,
  PAYMENT_CREATED,
  FETCHED_COMMENTS,
  SELECTION,
  ERROR,
  CREATE_ERROR,
  RESET,
  RESET_ERROR,
  FETCHED_POOL,
  JOINED
} from '../types';
import * as actions from '../PoolActions';
import { mockStore } from '../../testing/utils';
import moxios from 'moxios';

describe('async action creators', () => {
  beforeEach(() => {
		moxios.install();
  });
	
  afterEach(() => {
		moxios.uninstall();
  });
	
  it('should create an action for fetching pools for current user ', done => {
		const res = { 1: 'pool1', 2: 'pool2' };
		const store = mockStore({});
    moxios.stubRequest('/api/mypools', {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: MY_POOLS,
      payload: res
    };
    return store.dispatch(actions.fetchMyPools()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    });
  });
});

describe('normal action creators', () => {
  it('should create an action for setting an error', () => {
    const text = 'error';
    const expectedAction = {
      type: ERROR,
      payload: text
    };
    expect(actions.setError(text)).toEqual(expectedAction);
  });

  it('should create an action for resetting an error', () => {
    const expectedAction = {
      type: RESET_ERROR
    };
    expect(actions.resetError()).toEqual(expectedAction);
  });

  it('should create an action for setting a user selection on the chart', () => {
    const expectedAction = {
      type: SELECTION,
      payload: '2'
    };
    expect(actions.setSelection('2')).toEqual(expectedAction);
  });

  it('should create an action for setting the current user to be apart of the displayed chart', () => {
    const expectedAction = {
      type: JOINED
    };
    expect(actions.joined()).toEqual(expectedAction);
  });

  it('should create an action for resetting elements of the pools reducer', () => {
    const expectedAction = {
      type: RESET
    };
    expect(actions.reset()).toEqual(expectedAction);
  });
});
