import React from "react";
import { Link } from 'react-router-dom'

const FormNavBar = ({currPath}) => {


  return (
    <div className="form-nav-bar">
      <Link className="logo"to="/">Mocdoc</Link>
      <div className="nav-container">
        {
          (currPath === "/signin") ?
            <Link to="/createuser/details" className="nav-link">Register</Link> :
            <Link to="/signin" className="nav-link">Log in</Link>
        }
      </div>
    </div>
  )
}

export default FormNavBar