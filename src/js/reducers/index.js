import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import planReducer from './planReducer';
import subScriptionReducer from './subScriptionReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  // form,
  user:userReducer,
  plans:planReducer,
  subScription:subScriptionReducer,
  orders:orderReducer

});
export default rootReducer;
