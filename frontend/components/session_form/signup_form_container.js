import { connect } from 'react-redux';
import { signup, clearSessionErrors } from '../../actions/session_actions';
import SignupForm from './signup_form'

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  currPath: ownProps.match.path
})

const mapDispatchToProps = (dispatch) => ({
  signup: (form) => dispatch(signup(form)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect( mapStateToProps ,mapDispatchToProps)(SignupForm);