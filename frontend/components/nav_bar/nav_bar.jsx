import React from "react";
import { Link } from 'react-router-dom'

const NavBar = ({currentUser, logout}) => {
  const sessionLinks = () => (
    <div>
      <Link to="/signin">Log In</Link>
      <Link to="/createuser/details">Sign Up</Link>
    </div>
  )

  const patientNav = () => (
    <div>
      <div>My Mocdoc</div>
      <div>Past Appointments</div>
      <div>{currentUser.email}</div>
    </div>
  )

  return (
    <div>
      <h1>Mocdoc</h1>
      {currentUser ? patientNav() : sessionLinks()}
    </div>
  )
}

export default NavBar