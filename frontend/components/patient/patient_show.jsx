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

  renderNameAndAge() {
    const currentUser = this.props.currentUser;
    
    return (
      <div className="panel-left-item">
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <p>{currentUser.age} year old</p>
      </div>
    )
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
            <div className="panel-left">
              {this.renderNameAndAge()}
            </div>
            <div className="panel-right"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientShow;