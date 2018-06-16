import {
  FETCH_USER,
  MY_POOLS,
  ALL_POOLS,
  CHART_CREATED,
  COMMENT_CREATED,
  PAYMENT_CREATED,
  FETCHED_COMMENTS,
  SELECTION,
	SELECT_POSITION_ERROR,
	CREATE_POOL_JOIN_POOL_ERROR,
  RESET,
  RESET_SELECT_POSITION_ERROR,
  FETCHED_POOL,
  JOINED
} from '../types';
import * as actions from '../PoolActions';
import {
  mockStore,
  mockChartData,
  mockChartInputs,
  mockPool
} from '../../testing/utils';
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

  it('should create an action for fetching all pools', done => {
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
      done();
    });
  });

  it('should create an action to create a chart', () => {
    const store = mockStore({});
    const values = mockChartInputs;
    const result = {
      info: values,
      users: mockChartData
    };
    const expectedAction = {
      type: CHART_CREATED,
      payload: result
    };

    store.dispatch(actions.createChart(values));
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('creates an action for creating a payment schedule', () => {
    moxios.stubRequest('/api/createPayment', {
      status: 200
    });
    const store = mockStore({});
    const expectedAction = {
      type: PAYMENT_CREATED
    };
    return store.dispatch(actions.createPayment({})).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('creates an action for creating creating a comment', () => {
    const store = mockStore({});
    const commentObj = {
      comment: 'hello',
      poolId: '5b19989f6ebe570be8471e02',
      pic:
        'https://lh5.googleusercontent.com/-VpQihZZnp-8/AAAAAAAAAAI/AAAAAAAAABc/patMkO_Cl2Y/photo.jpg?sz=50'
    };
    const res = { _pool: '5b19989f6ebe570be8471e02' };
    moxios.stubRequest('/api/saveComment', commentObj, {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: COMMENT_CREATED
    };
    //test is passing as a false positive...
    //need more research on moxios.wait and how to test an action creator with two dispatches
    moxios.wait(() => {
      return store.dispatch(actions.createComment(commentObj)).then(() => {
        expect(store.getActions()).toEqual([expectedAction]);
      });
    });
  });

  it('creates an action for fetching a specific pool', () => {
    const id = '5b21eec48ed00e0d0206c943';
    const store = mockStore({});
    const res = {
      pool: mockPool,
      obj: mockChartInputs
    };
    const result = {
      info: mockChartInputs,
      users: mockChartData
    };
    const expectedAction = [
      {
        type: CHART_CREATED,
        payload: result
      },
      {
        type: FETCHED_POOL,
        payload: res.pool
      }
    ];
    moxios.stubRequest(`/api/fetchPool/${id}`, {
      status: 200,
      response: res
    });

    return store.dispatch(actions.fetchPool(id)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('creates an action for fetching all comments', done => {
    const id = 2;
    const store = mockStore({});
    const res = { 1: 'comment1', 2: 'comment2' };
    moxios.stubRequest(`/api/comments/${id}`, {
      status: 200,
      response: res
    });
    const expectedAction = {
      type: FETCHED_COMMENTS,
      payload: res
    };
    return store.dispatch(actions.fetchComments(id)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    });
  });
});

describe('normal action creators', () => {
  it('should create an action for setting an error', () => {
    const text = 'error';
    const expectedAction = {
			type: SELECT_POSITION_ERROR,
      payload: text
    };
    expect(actions.setError(text)).toEqual(expectedAction);
  });

  it('should create an action for resetting an error', () => {
    const expectedAction = {
			type: RESET_SELECT_POSITION_ERROR
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
