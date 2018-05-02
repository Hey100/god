import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import poolReducer from './poolReducer';

export default combineReducers({
  auth: authReducer,
  pools: poolReducer,
  form: reduxForm
});
