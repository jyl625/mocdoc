import React from "react";
import { Link } from 'react-router-dom'

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

  openLoginModel = () => {
    this.props.openModal("LoginForm");
  }

  sessionLinks = () => (
    <div className="nav-container">
      <div>
        <div className="nav-link" onClick={this.openLoginModel}>Log In</div>
      </div>
      <div>
        <Link to="/createuser/details" className="nav-link">Sign Up</Link>
      </div>
    </div>
  )

  patientNav = () => (
    <div className="nav-container-logged_in">
      <div><Link to="/" className="nav-link">My Mocdoc</Link></div>
      <div><Link to="/" className="nav-link">Past Appointments</Link></div>
      <div className={this.state.isListOpen ? "dropdown-header-selected" : "dropdown-header"} 
        onClick={() => this.toggleDropDown()}>
        <div className="patient-name" >{this.props.currentUser.first_name}</div>
        <div className="dropdown">
          {this.dropDownMenu()}
        </div>
      </div>
    </div>
  )

  toggleDropDown = () => {
    this.setState({ isListOpen: !this.state.isListOpen})
  }

  dropDownMenu = () => {
    if (this.state.isListOpen) {
      return <div className="signout" 
                  onClick={() => this.props.logout()}>&times; Sign out</div>
    } else {
      return null;
    }
  }

  render() {
    console.log(this.props.modal)
    return (
      <>
        {this.props.modal.includes("LoginForm") ? <ModalLoginFormContainer /> : null }

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

export default NavBar