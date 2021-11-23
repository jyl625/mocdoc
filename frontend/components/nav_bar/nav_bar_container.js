import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { openModal } from '../../actions/ui_actions'

import NavBar from './nav_bar'

// const mapStateToProps = ({ entities: users, session }) => ({
//   currentUser: users[session.currentUserId]
// })
const mapStateToProps = ({entities, session}) => ({
  currentUser: entities.users[session.currentUserId]
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  openModal: () => dispatch(openModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)