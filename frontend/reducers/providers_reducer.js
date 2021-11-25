import { RECEIVE_PROVIDER } from '../actions/provider_actions'

const providersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_PROVIDER:
      return { [action.payload.provider.id]: action.payload.provider}
    default:
      return oldState;
  }
}

export default providersReducer