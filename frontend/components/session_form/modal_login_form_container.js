import { connect } from 'react-redux';
import { login, clearSessionErrors } from '../../actions/session_actions';
import { closeModal} from '../../actions/ui_actions'
import ModalLoginForm from './modal_login_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,

})

const mapDispatchToProps = (dispatch) => ({
  login: (form) => dispatch(login(form)),
  clearSessionErrors: () => dispatch(clearSessionErrors()),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalLoginForm);