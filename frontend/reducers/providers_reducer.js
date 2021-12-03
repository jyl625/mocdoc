import { RECEIVE_PROVIDER, RECEIVE_PROVIDERS } from '../actions/provider_actions'
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const providersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_PROVIDER:
      newState[action.payload.provider.id] = action.payload.provider
      return newState
    case RECEIVE_CURRENT_USER:
      Object.assign(newState, action.payload.providers);
      return newState;
    case RECEIVE_PROVIDERS:
      Object.assign(newState, action.payload.providers);
      return newState;
    default:
      return oldState;
  }
}
 
export default providersReducer;