import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS,
  SWITCH_MODAL_STATE,
  FETCH_PLANS,
  ROOT_URL
} from './actionTypes';


export function signinUser( username, password ) {
  return function(dispatch) {
    return new Promise( (resolve)=>{
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { username, password })
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('MyOnlineMealToken', response.data.token);
                resolve(response)
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Wrong Login credentials, Please try again.'));
            });
    })
  }
}

export function signUpUser(values) {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.post(`${ROOT_URL}/signup`, values)
            .then(response => {

                dispatch({ type: AUTH_USER });
                localStorage.setItem('MyOnlineMealToken', response.data.token);
                resolve (response)
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(authError(errorData));
            });
        })
    }
}
export function getAllPlans() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/plan`)
            .then(response => {
                dispatch({ type: FETCH_PLANS });

            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(authError(errorData));
            });
        })
    }
}
export function modalStatus(state, page){
    return function(dispatch){
        dispatch({
            type: SWITCH_MODAL_STATE,
            payload:{isOpen:state, page}
        });
    }
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('MyOnlineMealToken');
  return function(dispatch) {
      return new Promise( (resolve)=>{
          dispatch({ type: UNAUTH_USER }) ;
          resolve()
      })
  }
}

export function fetchProduct() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/inventory`, {
            headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
        })
        .then(response => {
            dispatch({
                type: FETCH_OFFERS,
                payload: response.data
            });
        });
    }
}
