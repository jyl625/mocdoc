import * as APIUtil from '../util/insurance_api_util';

export const RECEIVE_INSURANCES = "RECEIVE_INSURANCES";

export const receiveInsurances = insurances => ({
  type: RECEIVE_INSURANCES,
  insurances
})

export const fetchInsurances = hios_id => dispatch => (
  APIUtil.fetchInsurances(hios_id).then(insurances => (
    dispatch(receiveInsurances(insurances))
  ))
)