import { CLOSE_MODAL, OPEN_MODAL} from '../actions/ui_actions';

const defaultState = ({
  modal: false
})

const uiReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState) 

  switch (action.type) {
    case CLOSE_MODAL:
      return {modal: false}
    case OPEN_MODAL:
      return {modal: true}
    default:
      return oldState;
  }
}

export default uiReducer