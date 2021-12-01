import * as APIUtil from '../util/appointment_api_util';

export const RECEIVE_APPOINTMENT = "RECEIVE_APPOINTMENT";

export const receiveAppointment = (appointment) => {
  return {
  type: RECEIVE_APPOINTMENT,
  appointment
}}

export const createAppointment = (appointment) => (dispatch) => (
  APIUtil.createAppointment(appointment)
  .then(appointment => (dispatch(receiveAppointment(appointment))))
)