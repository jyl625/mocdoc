import { connect } from 'react-redux';
// import { closeModal } from '../../actions/ui_actions'

import { fetchCurrentSession } from '../../actions/session_actions'
import { fetchProviders } from '../../actions/provider_actions'


import Search from './search'

const mapStateToProps = ({ entities, session, ui }) => ({
  currentUser: entities.users[session.currentUserId],
  session: entities.session,
  providers: entities.providers.all,
  specialties: entities.specialties
})

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentSession: () => dispatch(fetchCurrentSession()),
  fetchProviders: (plan, specialty) => dispatch(fetchProviders(plan, specialty)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);