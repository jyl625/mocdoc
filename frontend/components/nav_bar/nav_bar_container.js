import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import NavBar from './nav_bar'

// const mapStateToProps = ({ entities: users, session }) => ({
//   currentUser: users[session.currentUserId]
// })
const mapStateToProps = ({entities, session}) => ({
  currentUser: entities.users[session.currentUserId]
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)