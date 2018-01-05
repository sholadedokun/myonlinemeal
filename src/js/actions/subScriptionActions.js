import axios from 'axios';
import {
  SUBSCRIPTION_ERROR,
  SUBCRIBE_TO_PLAN,
  SUBCRIBE_TO_PLAN_ERROR,
  FETCH_SUBSCRIPTIONS,
  ROOT_URL
} from './actionTypes';
import {getCurrentOrder} from './orderActions'
export function getSubScription() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/subScription`, {
                headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
            })
            .then(response => {
                dispatch({ type: FETCH_SUBSCRIPTIONS, payload: response.data });
                resolve(response.data)
                dispatch(getCurrentOrder());
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(planError(errorData));
            });
        })
    }
}

export function subscribeToPlan(id) {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.post(`${ROOT_URL}/subscribeToPlan/${id}`, null, {
                headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
            })
            .then(response => {
                dispatch({ type: SUBCRIBE_TO_PLAN, payload:response.data });
                resolve(response.data)

            })
            .catch(error => {
                console.log(error, error.response)
                // let errorData= response.data.error
                // dispatch(planError(errorData));
            });
        })
    }
}
export function planError(error) {
  return {
    type: SUBSCRIPTION_ERROR,
    payload: error
  };
}
