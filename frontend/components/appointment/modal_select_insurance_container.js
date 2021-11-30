import { connect } from 'react-redux';

import ModalSelectInsurance from './modal_select_insurance';
import { openModal, closeModal } from '../../actions/ui_actions';
import {fetchInsurances} from '../../actions/insurance_actions'

const mapStateToProps = ({entities, session, ui}) => {
  return {
    insurances: entities.insurances
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchInsurances: (hios_id) => dispatch(fetchInsurances(hios_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectInsurance)