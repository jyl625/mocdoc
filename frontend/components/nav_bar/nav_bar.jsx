import React from "react";
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false
    }
  }

  openLoginModel = () => {
    this.props.openModal();
  }

  sessionLinks = () => (
    <div className="nav-container">
      <div><div className="nav-link" onClick={this.openLoginModel}>Log In</div></div>
      <div><Link to="/createuser/details" className="nav-link">Sign Up</Link></div>
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
    return (
      <div className="nav-bar">
        <Link className="logo"to="/">Mocdoc</Link>
        {this.props.currentUser ? this.patientNav() : this.sessionLinks()}
      </div>
    )
  }
}

// const NavBar = ({currentUser, logout}) => {
//   const sessionLinks = () => (
//     <div className="nav-container">
//       <Link to="/signin" className="nav-link">Log In</Link>
//       <Link to="/createuser/details" className="nav-link">Sign Up</Link>
//     </div>
//   )

//   const patientNav = () => (
//     <div className="nav-container-logged_in">
//       <div className="nav-link">My Mocdoc</div>
//       <div className="nav-link">Past Appointments</div>
//       <div className="patient-name">{currentUser.email}</div>
//       <div className="signout" onClick={() => logout()}>&times; Sign out</div>
//     </div>
//   )

//   return (
//     <div className="nav-bar">
//       <Link className="logo"to="/">Mocdoc</Link>
//       {currentUser ? patientNav() : sessionLinks()}
//     </div>
//   )
// }

export default NavBar