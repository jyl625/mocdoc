import { connect } from "react-redux";

import { fetchCurrentSession, updateUser } from '../../actions/session_actions'
import { openModal, closeModal } from '../../actions/ui_actions';
import { requestAppointment } from '../../actions/appointment_actions'
import { fetchInsurance } from '../../actions/insurance_actions'
import { fetchSpecialties } from '../../actions/specialty_actions'
import { fetchProviders } from '../../actions/provider_actions'


import SearchBar from "./search_bar";

const mapStateToProps = ({ entities, session, ui }) => {

  return {
    currentUser: entities.users[session.currentUserId],
    insurances: entities.insurances,
    modal: ui.modal,
    specialties: entities.specialties, 
    providers: entities.providers
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentSession: () => dispatch(fetchCurrentSession()),
  requestAppointment: (appointmentId) => dispatch(requestAppointment(appointmentId)),
  fetchInsurance: (planId) => dispatch(fetchInsurance(planId)),
  openModal: modalType => dispatch(openModal(modalType)),
  closeModal: () => dispatch(closeModal()),
  fetchSpecialties: (name) => dispatch(fetchSpecialties(name)),
  fetchProviders: (plan, specialty) => dispatch(fetchProviders(plan, specialty)),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)