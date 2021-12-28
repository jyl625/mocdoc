import { connect } from "react-redux";

import { fetchCurrentSession } from '../../actions/session_actions'

import PatientPastAppointmentIndex from "./patient_past_appt_index";

const mapStateToProps = ({entities, session}) => {
  return {
    currentUser: entities.users[session.currentUserId],
    appointments: entities.appointments,
    providers: entities.providers.user
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    fetchCurrentSession: () => dispatch(fetchCurrentSession())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientPastAppointmentIndex)