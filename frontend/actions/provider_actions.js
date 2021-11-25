import * as APIUtil from '../util/provider_api_util';

export const RECEIVE_PROVIDER = "RECEIVE_PROVIDER";

export const receiveProvider = payload => ({
  type: RECEIVE_PROVIDER,
  payload
})

export const fetchProvider = id => dispatch => (
  APIUtil.fetchProvider(id).then(payload => (
    dispatch(receiveProvider(payload))
  ))
)