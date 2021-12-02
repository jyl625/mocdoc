import * as APIUtil from '../util/insurance_api_util';

export const RECEIVE_INSURANCES = "RECEIVE_INSURANCES";
export const RECEIVE_INSURANCE = "RECEIVE_INSURANCE";

export const receiveInsurances = insurances => ({
  type: RECEIVE_INSURANCES,
  insurances
})

//receiving single insurance
export const receiveInsurance = insurance => ({
  type: RECEIVE_INSURANCE,
  insurance
})

export const fetchInsurances = carrier => dispatch => (
  APIUtil.fetchInsurances(carrier).then(insurances => (
    dispatch(receiveInsurances(insurances))
  ))
)

//fetching single insurance
export const fetchInsurance = planId => dispatch => (
  APIUtil.fetchInsurance(planId).then(insurance => (
    dispatch(receiveInsurances(insurance))
  ))
)