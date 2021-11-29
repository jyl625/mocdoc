import React from "react";
import NavBarContainer from "../nav_bar/nav_bar_container";

class PatientShow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.currentUser)
    return(
      <div className="patient-show">
        <NavBarContainer/>
        <div className="main-page">
          testing testing
        </div>
      </div>
    );
  }
}

export default PatientShow;