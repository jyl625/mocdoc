import { RECEIVE_PROVIDER } from '../actions/provider_actions'

const providersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  const nextState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_PROVIDER:
      nextState[action.payload.provider.id] = action.payload.provider
      return nextState
    default:
      return oldState;
  }
}

export default providersReducer;