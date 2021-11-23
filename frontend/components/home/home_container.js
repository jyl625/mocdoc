import { connect } from 'react-redux';
import { closeModal } from '../../actions/ui_actions'
import Home from './home'

const mapStateToProps = (state) => ({
  ui: state.ui
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);