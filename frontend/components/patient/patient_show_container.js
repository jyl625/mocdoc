import { connect } from "react-redux";

import { fetchCurrentSession } from '../../actions/session_actions'
import PatientShow from "./patient_show";

const mapStateToProps = ({entities, session}) => {
  const currentUser = entities.users[session.currentUserId]
  const insurances = entities.insurances
  return {
    currentUser,
    insurances
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    fetchCurrentSession: () => dispatch(fetchCurrentSession())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PatientShow);

