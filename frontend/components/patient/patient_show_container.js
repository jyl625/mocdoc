import { connect } from "react-redux";

import { fetchCurrentSession } from '../../actions/session_actions'
import { deleteAppointment } from '../../actions/appointment_actions'
import PatientShow from "./patient_show";

import { selectPatientAppointments } from '../../reducers/selectors'

const mapStateToProps = ({entities, session}) => {
  const currentUser = entities.users[session.currentUserId]
  const insurances = entities.insurances
  const appointments = entities.appointments
  const providers = entities.providers
  return {
    currentUser,
    insurances,
    appointments,
    providers
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    fetchCurrentSession: () => dispatch(fetchCurrentSession()),
    deleteAppointment: (appointmentId) => dispatch(deleteAppointment(appointmentId))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientShow);

