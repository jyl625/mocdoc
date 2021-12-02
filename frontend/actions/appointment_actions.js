import * as APIUtil from '../util/appointment_api_util';

export const RECEIVE_APPOINTMENT = "RECEIVE_APPOINTMENT";
export const REMOVE_APPOINTMENT = "REMOVE_APPOINTMENT";

export const receiveAppointment = (appointment) => {
  return {
    type: RECEIVE_APPOINTMENT,
    appointment
}}

export const removeAppointment = (appointmentId) => {
  return {
    type: REMOVE_APPOINTMENT,
    appointmentId
}}

export const requestAppointment = (appointmentId) => (dispatch) => (
  APIUtil.requestAppointment(appointmentId)
  .then(appointment => dispatch(receiveAppointment(appointment)))
)

export const createAppointment = (appointment) => (dispatch) => (
  APIUtil.createAppointment(appointment)
  .then(appointment => (dispatch(receiveAppointment(appointment))))
)

export const updateAppointment = (appointment) => (dispatch) => (
  APIUtil.updateAppointment(appointment)
  .then(appointment => (dispatch(receiveAppointment(appointment))))
)

export const deleteAppointment = (appointmentId) => (dispatch) => (
  APIUtil.deleteAppointment(appointmentId)
  .then(appointment => {
    dispatch(removeAppointment(appointment.id))
  })
)