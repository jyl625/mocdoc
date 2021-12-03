import { connect } from 'react-redux';
// import { closeModal } from '../../actions/ui_actions'

import { fetchCurrentSession } from '../../actions/session_actions'


import Search from './search'

const mapStateToProps = ({ entities, session, ui }) => ({
  currentUser: entities.users[session.currentUserId],
  session: entities.session
})

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentSession: () => dispatch(fetchCurrentSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);