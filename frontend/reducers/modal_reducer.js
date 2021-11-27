import { CLOSE_MODAL, OPEN_MODAL } from '../actions/ui_actions';


const defaultState = (
  []
)

const modalReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState)

  let nextState = [...oldState]

  switch (action.type) {
    case CLOSE_MODAL:
      return defaultState;
    case OPEN_MODAL:
      nextState.push(action.modalType)
      return nextState;
    default:
      return oldState;
  }
}

export default modalReducer;