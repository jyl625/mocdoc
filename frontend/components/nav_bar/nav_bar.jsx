import React from "react";
import { Link } from 'react-router-dom'

const NavBar = ({currentUser, logout}) => {
  const sessionLinks = () => (
    <div className="nav-container">
      <Link to="/signin" className="nav-link">Log In</Link>
      <Link to="/createuser/details" className="nav-link">Sign Up</Link>
    </div>
  )

  const patientNav = () => (
    <div className="nav-container-logged_in">
      <div className="nav-link">My Mocdoc</div>
      <div className="nav-link">Past Appointments</div>
      <div className="patient-name">{currentUser.email}</div>
      <div className="signout" onClick={() => logout()}>&times; Sign out</div>
    </div>
  )

  return (
    <div className="nav-bar">
      <Link className="logo"to="/">Mocdoc</Link>
      {currentUser ? patientNav() : sessionLinks()}
    </div>
  )
}

export default NavBar