import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions'

const defaultState = ({
  currentUserId: null,
})

const sessionReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {currentUserId: action.currentUser.id}
    case LOGOUT_CURRENT_USER:
      return defaultState;
    default:
      return oldState;
  }
}

export default sessionReducer;