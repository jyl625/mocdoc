import { RECEIVE_PROVIDER } from '../actions/provider_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_INSURANCES } from '../actions/insurance_actions'

const insurancesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      // return newState[action.payload.insurance.plan_id] = action.payload.insurance
      Object.assign(newState, action.payload.insurance)
      return newState;
    case RECEIVE_PROVIDER:
      Object.assign(newState, action.payload.insurances)
      return newState;
    case RECEIVE_INSURANCES:
      console.log(action.insurances)
      Object.assign(newState, action.insurances)
      return newState;
    default:
      return oldState;
  }
}

export default insurancesReducer;