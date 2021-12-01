import { RECEIVE_PROVIDER } from "../actions/provider_actions";
import { RECEIVE_APPOINTMENT } from '../actions/appointment_actions'

const appointmentsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = Object.assign({}, oldState)

  switch(action.type) {
    case RECEIVE_PROVIDER:
      Object.assign(newState, action.payload.appointments);
      return newState;
    case RECEIVE_APPOINTMENT:
      newState[action.appointment.id] = action.appointment;
      return newState;
    default:
      return newState;
  }
}

export default appointmentsReducer;