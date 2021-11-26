import { RECEIVE_PROVIDER } from '../actions/provider_actions'

const insurancesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_PROVIDER:
      return action.payload.insurances;
    default:
      return oldState;
  }
}

export default insurancesReducer;