import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  currPath: ownProps.match.path
})

const mapDispatchToProps = (dispatch) => ({
  login: (form) => dispatch(login(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);