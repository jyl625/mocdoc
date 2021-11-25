import * as APIUtil from '../util/provider_api_util';

export const RECEIVE_PROVIDER = "RECEIVE_PROVIDER";

export const receiveProvider = provider => ({
  type: RECEIVE_PROVIDER,
  provider
})

export const fetchProvider = id => dispatch => (
  APIUtil.fetchProvider(id).then(provider => (
    dispatch(receiveProvider(provider))
  ))
)