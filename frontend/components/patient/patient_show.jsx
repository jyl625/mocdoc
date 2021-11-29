import React from "react";
import { Link } from 'react-router-dom';

import NavBarContainer from "../nav_bar/nav_bar_container";

class PatientShow extends React.Component {
  constructor(props) {
    super(props)
  }

  // TESTING ONLY
  randDoctorId() {
    return Math.floor(Math.random() * 14257 + 1)
  }

  render() {
    console.log(this.props.currentUser)
    return(
      <div className="patient-show">
        <NavBarContainer/>
        <div className="main-page">
          <div className="search-section">
            <div className="test">
              <Link to={`/doctor/${this.randDoctorId()}`}><button>I'm Feeling Lucky</button></Link>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel-left"></div>
            <div className="panel-right"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientShow;