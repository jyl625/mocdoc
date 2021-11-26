import { RECEIVE_PROVIDER } from '../actions/provider_actions'

const specialtiesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  // const nextState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_PROVIDER:
      // Object.assign(nextState, action.payload.specialties)
      console.log(action.payload)
      return action.payload.specialties;
    default:
      return oldState;
  }
}

export default specialtiesReducer;