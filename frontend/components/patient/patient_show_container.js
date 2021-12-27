import { connect } from "react-redux";

import { fetchCurrentSession } from '../../actions/session_actions'
import { deleteAppointment } from '../../actions/appointment_actions'
import PatientShow from "./patient_show";


const mapStateToProps = ({entities, session}) => {
  // const currentUser = entities.users[session.currentUserId]
 
  return {
    currentUser: entities.users[session.currentUserId],
    insurances: entities.insurances,
    appointments: entities.appointments,
    providers: entities.providers.user
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    fetchCurrentSession: () => dispatch(fetchCurrentSession()),
    deleteAppointment: (appointmentId) => dispatch(deleteAppointment(appointmentId))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientShow);

