import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SearchBarContainer from '../search_bar/search_bar_container';
import HomeFeaturedContainer from './home_featured_container';
// import ModalLoginFormContainer from '../session_form/modal_login_form_container'

// import { withRouter } from 'react-router';


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchCurrentSession()
    }
  }

  
  render() {
    return (
      <>
        {/* {this.props.modal ? <ModalLoginFormContainer/> : null} */}
        <NavBarContainer />
        <SearchBarContainer/>
        <div className="banner">Currently only searching for doctors in Los Angeles. Other cities coming soon&trade;</div>
        <div className="home-content">
          <HomeFeaturedContainer/>
        </div>
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