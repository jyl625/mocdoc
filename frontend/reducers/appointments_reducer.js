import { RECEIVE_PROVIDER } from "../actions/provider_actions";

const appointmentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_PROVIDER:
      Object.assign(newState, action.payload.appointments);
      return newState;
    default:
      return newState;
  }
}

export default appointmentsReducer;