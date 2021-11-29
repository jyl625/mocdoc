import React from "react";
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';

import ModalLoginFormContainer from '../session_form/modal_login_form_container'


class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false
    }
  }

  componentDidMount() {
    if (this.props.modal.length > 0) {
      this.props.closeModal()
    }
  }

  openLoginModal = () => {
    this.props.openModal("loginForm");
  }

  sessionLinks = () => (
    <div className="nav-container">
      <div>
        <div className="nav-link" onClick={this.openLoginModal}>Log In</div>
      </div>
      <div>
        <Link to="/createuser/details" className="nav-link">Sign Up</Link>
      </div>
    </div>
  )

  patientNav = () => (
    <div className="nav-container-logged_in">
      <div><Link to="/patient" className="nav-link">My Mocdoc</Link></div>
      <div><Link to="/patient" className="nav-link">Past Appointments</Link></div>
      <div className={this.state.isListOpen ? "dropdown-header-selected" : "dropdown-header"} 
        onClick={() => this.toggleDropDown()}>
        <div className="patient-name-container" >
          <div className="patient-name">{this.props.currentUser.first_name}</div>
          {this.chevronImg()}
        </div>
        <div className="dropdown">
          {this.dropDownMenu()}
        </div>
      </div>
    </div>
  )

  chevronImg() {
    if (this.state.isListOpen) {
      return <img className="up" src="/images/chevron-up-solid.svg" />
    } else {
      return <img className="down" src ="/images/chevron-down-solid.svg" />
    }
  }

  toggleDropDown = () => {
    this.setState({ isListOpen: !this.state.isListOpen})
  }

  dropDownMenu = () => {
    if (this.state.isListOpen) {
      return (
        <div className="dropdown-item">
          <div className="signout" onClick={this.handleLogout}>
            <img className="close-button"
              onClick={this.handleCloseModal}
              src="/images/times-solid.svg" alt="close button" />
            <div className="dropdown-text">Sign Out</div>
          </div>
        </div>
      ) 
    } else {
      return null;
    }
  }

  handleLogout = () => {
    return this.props.logout().then(res => {
      if (res.type === "LOGOUT_CURRENT_USER") {
        this.props.closeModal()
        this.props.history.push("/")
      }
    })
  }

  render() {
    return (
      <>
        {this.props.modal.includes("loginForm") ? <ModalLoginFormContainer /> : null }

        <div className="nav-bar">
          <div className="nav-content-container">
            <Link className="logo"to="/">Mocdoc</Link>
            {this.props.currentUser ? this.patientNav() : this.sessionLinks()}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(NavBar)