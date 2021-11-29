import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_SESION_ERRORS = "CLEAR_SESION_ERRORS"

export const receiveCurrentUser = payload => ({
  type: RECEIVE_CURRENT_USER,
  payload
})

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})




export const clearSessionErrors = () => ({
  type: CLEAR_SESION_ERRORS,
})

export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user)) 
  ), errorRes => (
    dispatch(receiveSessionErrors(errorRes.responseJSON))
  ))
)

export const logout = () => dispatch => (
  APIUtil.logout().then(() => (
    dispatch(logoutCurrentUser())
  ), errorRes => (
    dispatch(receiveSessionErrors(errorRes.responseJSON))
  ))
)

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
    ), errorRes => (
      dispatch(receiveSessionErrors(errorRes.responseJSON))
    ))
)

export const fetchCurrentSession = () => dispatch => (
  APIUtil.fetchCurrentSession().then(user => (
    dispatch(receiveCurrentUser(user))
  ), errorRes => (
    dispatch(receiveSessionErrors(errorRes.responseJSON))
  ))
)

