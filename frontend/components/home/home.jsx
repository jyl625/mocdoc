import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import ModalLoginFormContainer from '../session_form/modal_login_form_container'

import { withRouter } from 'react-router';


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.modal) {
      this.props.closeModal()
    }
  }

  
  render() {
    return (
      <>
        {this.props.modal ? <ModalLoginFormContainer/> : null}
        <NavBarContainer />
        <div className="search-banner"></div>
        <div className="home-content"></div>
      </>
    )
  }
}

// const Home = (props) => (
//   <>
//     {props.ui.modal ? <ModalLoginFormContainer/> : null}
//     <NavBarContainer/>
//     <div className="search-banner"></div>
//     <div className="home-content"></div>
//   </>
// )

// export default withRouter(Home)
export default Home