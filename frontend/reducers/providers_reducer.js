import { RECEIVE_PROVIDER } from '../actions/provider_actions'

const providersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_PROVIDER:
      return {[action.provider.id]: action.provider}
    default:
      return oldState;
  }
}

export default providersReducer