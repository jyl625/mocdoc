import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions'


const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let newState = Object.assign({}, oldState)
      newState[action.currentUser.id] = action.currentUser
      return newState;
    default:
      return oldState;
  }
}

export default usersReducer;