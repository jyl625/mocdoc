import { connect } from 'react-redux';

import { fetchProvider } from '../../actions/provider_actions'
import { selectProvider } from '../../reducers/selectors';
import DoctorShow from './doctor_show'

const mapStateToProps = (state, ownProps) => {
  // const providerId = parseInt(ownProps.match.params.id)
  // const provider = selectProvider(state.entities, providerId)

  return {
    // providerId: providerId,
    // provider: state.entities.providers[parseInt(ownProps.match.params.id)]
    provider: state.entities.providers[ownProps.match.params.id],
    specialties: state.entities.specialties,
    insurances: state.entities.insurances,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProvider: id => dispatch(fetchProvider(id))
})

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(DoctorShow);