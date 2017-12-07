import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS,
  SWITCH_MODAL_STATE
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SWITCH_MODAL_STATE:
        return {...state, isOpen:action.payload.isOpen, page:action.payload.page}
  }
  return state;
}
