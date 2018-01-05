import {
    ORDER_ERROR,
    FETCH_CURRENT_ORDERS,
} from '../actions/actionTypes';

export default function(state = {error:'', allPlans:''}, action) {
  switch(action.type) {
    case FETCH_CURRENT_ORDERS:
      return { ...state, error: '', allCurrentOrders: action.payload };
    case ORDER_ERROR:
      return { ...state, error: action.payload };

  }
  return state;
}
