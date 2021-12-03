import { connect } from 'react-redux';
// import { closeModal } from '../../actions/ui_actions'

import { fetchCurrentSession } from '../../actions/session_actions'


import Home from './home'

const mapStateToProps = ({ entities, session, ui }) => ({
  currentUser: entities.users[session.currentUserId],
  session: entities.session
})

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentSession: () => dispatch(fetchCurrentSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);