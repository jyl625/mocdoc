import { connect } from "react-redux";

import { fetchCurrentSession, updateUser } from '../../actions/session_actions'
import { openModal, closeModal } from '../../actions/ui_actions';
import { createAppointment, requestAppointment, updateAppointment } from '../../actions/appointment_actions'
import { fetchProvider } from "../../actions/provider_actions";
import { fetchInsurance } from '../../actions/insurance_actions'
import ReviewAndBook from './review_and_book'

const mapStateToProps = ({entities, session, ui}, ownProps) => {
  const appointment = entities.appointments[ownProps.match.params.id]
  // const provider = entities.providers[entities.appointments[ownProps.match.params.id].provider_id]

  return {
    currentUser: entities.users[session.currentUserId],
    insurances: entities.insurances,
    appointments: entities.appointments,
    appointment,
    modal: ui.modal,
    providers: entities.providers.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestAppointment: (appointmentId) => dispatch(requestAppointment(appointmentId)),
    fetchCurrentSession: () => dispatch(fetchCurrentSession()),
    openModal: modalType => dispatch(openModal(modalType)),
    closeModal: () => dispatch(closeModal()),
    updateAppointment: (appointment) => dispatch(updateAppointment(appointment)),
    updateUser: (user) => dispatch(updateUser(user)),
    fetchInsurance: (planId) => dispatch(fetchInsurance(planId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAndBook)