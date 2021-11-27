import { connect } from 'react-redux';

import { fetchProvider } from '../../actions/provider_actions'
import { selectProvider } from '../../reducers/selectors';
import { openModal, closeModal } from '../../actions/ui_actions';
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
    modal: state.ui.modal
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProvider: id => dispatch(fetchProvider(id)),
  openModal: modalType => dispatch(openModal(modalType)),
  closeModal: () => dispatch(closeModal())
})

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(DoctorShow);