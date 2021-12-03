import * as APIUtil from '../util/specialty_api_util';

export const RECEIVE_SPECIALTIES = "RECEIVE_SPECIALTIES"

export const receiveSpecialties = specialties => ({
  type: RECEIVE_SPECIALTIES,
  specialties
})

export const fetchSpecialties = specialtyName => dispatch => (
  APIUtil.fetchSpecialties(specialtyName).then(specialties => (
    dispatch(receiveSpecialties(specialties))
  ))
)