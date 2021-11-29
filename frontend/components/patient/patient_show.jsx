import React from "react";

class PatientShow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.currentUser)
    return(
      <>
        <div>testing</div>
      </>
    );
  }
}

export default PatientShow;