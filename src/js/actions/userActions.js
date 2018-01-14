import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS,
  UPDATE_USER,
  SWITCH_MODAL_STATE,
  FETCH_PLANS,
  FETCH_USER,
  FETCH_SERVER_DATE,
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
export function modalStatus(state, page, extraArgument){
    return function(dispatch){
        dispatch({
            type: SWITCH_MODAL_STATE,
            payload:{isOpen:state, page, extraArgument}
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
export function fetchUser() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/userProfile`, {
                headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
            })
            .then(response => {
                dispatch({
                    type: FETCH_USER,
                    payload: response.data
                });
                resolve()
            });
        })
    }
}
export function saveDelivery(deliveryAddress) {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.post(`${ROOT_URL}/deliveryAddress`, deliveryAddress, {
                headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
            })
            .then(response => {
                dispatch({
                    type: UPDATE_USER,
                    payload: response.data
                });
                resolve()
            });
        })
    }
}
export function getServerDate() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/serverDate`)
        .then(response => {
            dispatch({
                type: FETCH_SERVER_DATE,
                payload: response.data
            });
        });
    }
}
