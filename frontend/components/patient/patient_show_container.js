import { connect } from "react-redux";

import PatientShow from "./patient_show";

const mapStateToProps = ({entities, session}) => (
  {
    currentUser: entities.users[session.currentUserId]
  }
)

const mapDispatchToProps = (dispatch) => (
  {}
)

export default connect(mapStateToProps, null)(PatientShow);

