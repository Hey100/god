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

describe('async/reduxthunk action creators', () => {
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
      //documentation indicates that expected action comes back as an array
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    });
  });

  it('should create an action for fetching all pools', () => {
    const res = { 1: 'pool1', 2: 'pool2', 3: 'pool3', 4: 'pool4' };
    const store = mockStore({});
    moxios.stubRequest('/api/allpools', {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: ALL_POOLS,
      payload: res
    };
    return store.dispatch(actions.fetchAllPools()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create an action to create a chart', () => {
    const store = mockStore({});
    const values = {
      amount: 2500,
      category: '',
      contributors: 5,
      description: '',
      rate: 5,
      startDate: '2018-06-27',
      title: ''
    };
    const result = {
      info: values,
      users: [
        {
          amount: 2500,
          cashPaid: 2625,
          cashReceived: 2500,
          fee: 25,
          interestAmount: 125,
          interestRate: '4.76',
          monthly: 656.25,
          people: 5,
          startDate: '2018-06-27',
          tcr: 2475
        },
        {
          amount: 2500,
          cashPaid: 2593.75,
          cashReceived: 2531.25,
          fee: 25,
          interestAmount: 62.5,
          interestRate: '2.41',
          monthly: 648.4375,
          people: 5,
          startDate: '2018-06-27',
          tcr: 2506.25
        },
        {
          amount: 2500,
          cashPaid: 2562.5,
          cashReceived: 2562.5,
          fee: 25,
          interestAmount: 0,
          interestRate: '0.00',
          monthly: 640.625,
          people: 5,
          startDate: '2018-06-27',
          tcr: 2537.5
        },
        {
          amount: 2500,
          cashPaid: 2531.25,
          cashReceived: 2593.75,
          fee: 25,
          interestAmount: -62.5,
          interestRate: '-2.47',
          monthly: 632.8125,
          people: 5,
          startDate: '2018-06-27',
          tcr: 2568.75
        },
        {
          amount: 2500,
          cashPaid: 2500,
          cashReceived: 2625,
          fee: 25,
          interestAmount: -125,
          interestRate: '-5.00',
          monthly: 625,
          people: 5,
          startDate: '2018-06-27',
          tcr: 2600
        }
      ]
		};
		
    const expectedAction = {
      type: CHART_CREATED,
      payload: result
    };

    store.dispatch(actions.createChart(values));
    expect(store.getActions()).toEqual([expectedAction]);
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
