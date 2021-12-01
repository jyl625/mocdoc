import { connect } from "react-redux";

import AvailabilityGrid from './availability_grid'

const mapStateToProps = ({entities}) => {
  return {
    appointments: entities.appointments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityGrid)