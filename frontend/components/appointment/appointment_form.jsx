import React from "react";

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCurrentSession();
  }

  renderInsuranceCarriers() {
    const carriers = {"Anthem": "27603",
    "Blue Shield": "70285",
    "Bright": "67689",
    "Chinese Community": "47579",
    "HealthNet": "99110",
    "HealthNet": "67138",
    "Kaiser": "40513",
    "L.A. Care": "92815",
    "Molina": "18126",
    "Oscar": "10544",
    "Self-pay": "00000",
    "Sharp": "92499",
    "Valley": "84014",
    "Western": "93689"}
  }

  render() {
    const currentUser = this.props.currentUser;
    const userInsuranceObj = this.props.insurances[currentUser.plan_id]
    let userInsuranceValue = "Click to select"
    if (userInsuranceObj) {
      console.log(userInsuranceObj)
      let userInsuranceCarrier = userInsuranceObj.carrier
      let userInsurancePlan = userInsuranceObj.plan
      userInsuranceValue = `${userInsuranceCarrier} - ${userInsurancePlan}`
    }

    return(
      <div className="appointment-form-container">
        <form action="" className="appointment-form">
          <h2 >Book an appointment for free</h2>
          <div className="question-label">What's your insurance plan?</div>
          <input type="text"  value={userInsuranceValue} />

          <div className="question-label">What's the reason for your visit?</div>
          <input type="text"  value="Enter a reason" />

          <div className="question-label">Has the patient seen this doctor before?</div>
          <div className="radio-selections-container">
            <div className="radio-selection">
              <input type="radio" value="true" /><div>No</div>
            </div>
            <div className="radio-selection">
              <input type="radio"  value="false" /><div>Yes</div>
            </div>
          </div>

          <div className="question-label">Choose the type of appointment</div>
          <div className="radio-selections-container">
            <div className="radio-selection">
              <input type="radio" value="true" /><div>In-person</div>
            </div>
            <div className="radio-selection">
              <input type="radio" value="false" /><div>Video visit</div>
            </div>
          </div>

          <div className="question-label">Select an available date</div>
          <input type="date" id="appointmentDate" />

          <div className="question-label">Select an available time</div>
          <input type="time" id="appointmentTime" />

          <input type="submit" value="Continue booking" />
        </form>
      </div >
    )
  }
}

export default AppointmentForm