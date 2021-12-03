import * as APIUtil from '../util/provider_api_util';

export const RECEIVE_PROVIDER = "RECEIVE_PROVIDER";
export const RECEIVE_PROVIDERS = "RECEIVE_PROVIDERS";

export const receiveProvider = payload => ({
  type: RECEIVE_PROVIDER,
  payload
})
export const receiveProviders = payload => ({
  type: RECEIVE_PROVIDERS,
  payload
})

export const fetchProvider = id => dispatch => (
  APIUtil.fetchProvider(id).then(payload => (
    dispatch(receiveProvider(payload))
  ))
)

export const fetchProviders = (planIdQ, specialtyQ) => dispatch => (
  APIUtil.fetchProviders(planIdQ, specialtyQ).then(payload => (
    dispatch(receiveProviders(payload))
  ))
)