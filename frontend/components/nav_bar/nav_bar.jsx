import React from "react";

const NavBar = ({currentUser, logout}) => {
  const sessionLinks = () => (
    <div>
      <div>Log In</div>
      <div>Sign Up</div>
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