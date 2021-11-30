import { connect } from 'react-redux';

import { fetchCurrentSession } from '../../actions/session_actions'
import { openModal, closeModal } from '../../actions/ui_actions';
import AppointmentForm from './appointment_form'

const mapStateToProps = ({entities, session, ui}) => {
  const currentUser = entities.users[session.currentUserId]
  const insurances = entities.insurances
  return {
    currentUser,
    insurances,
    modal: ui.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentSession: () => dispatch(fetchCurrentSession()),
    openModal: modalType => dispatch(openModal(modalType)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm)