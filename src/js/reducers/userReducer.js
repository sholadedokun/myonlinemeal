import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS,
  FETCH_USER,
  SWITCH_MODAL_STATE
} from '../actions/actionTypes';

export default function(state = {error:'', authenticated:'', isOpen:'', page:''}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_USER:
      return { ...state, userDetails: action.payload };
    case SWITCH_MODAL_STATE:
        return {...state, isOpen:action.payload.isOpen, page:action.payload.page, extraArgument:action.payload.extraArgument}
  }
  return state;
}
