import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form'

const mapStateToProps = (state) => ({
  errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
  signup: (form) => dispatch(signup(form))
})

export default connect( mapStateToProps ,mapDispatchToProps)(SignupForm);