import { RECEIVE_PROVIDER, RECEIVE_PROVIDERS } from '../actions/provider_actions'
import { RECEIVE_SPECIALTIES } from '../actions/specialty_actions'

const specialtiesReducer = (oldState = {all: {}, single: {}, providers: {}}, action) => {
  Object.freeze(oldState);

  const nextState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_PROVIDER:
      // Object.assign(nextState, action.payload.specialties)
      nextState.single = action.payload.specialties
      return nextState;
      // return action.payload.specialties;
    case RECEIVE_SPECIALTIES:
      // Object.assign(nextState, action.specialties)
      // return nextState;
      // return action.specialties
      nextState.all = action.specialties
      return nextState;
    case RECEIVE_PROVIDERS:
      // Object.assign(nextState, action.payload.specialties)
      nextState.providers = action.payload.specialties
      return nextState;
    default:
      return oldState;
  }
}

export default specialtiesReducer;