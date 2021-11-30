import { connect } from 'react-redux';

import { fetchCurrentSession } from '../../actions/session_actions'
import AppointmentForm from './appointment_form'

const mapStateToProps = ({entities, session}) => {
  const currentUser = entities.users[session.currentUserId]
  const insurances = entities.insurances
  return {
    currentUser,
    insurances
  }
}

const maptDispatchToProps = (dispatch) => {
  return {
    fetchCurrentSession: () => dispatch(fetchCurrentSession())
  }
}

export default connect(mapStateToProps, maptDispatchToProps)(AppointmentForm)