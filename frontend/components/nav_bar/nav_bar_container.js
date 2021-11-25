import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { openModal, closeModal } from '../../actions/ui_actions'

import NavBar from './nav_bar'

const mapStateToProps = ({entities, session, ui}) => ({
  currentUser: entities.users[session.currentUserId],
  modal: ui.modal
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  openModal: () => dispatch(openModal()),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)