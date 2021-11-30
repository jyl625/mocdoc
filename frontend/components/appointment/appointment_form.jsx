import React from "react";

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      plan_id: "",
      reason: "Input a reason",
      new_patient: null,
      in_person: null,
      visit_date: "",
      visit_time: ""
    }
  }

  getCurrentDate() {
    const newDate = new Date()
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const date = newDate.getDate();
    return `${year}-${month}-${date}`;
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchCurrentSession();
    }
    this.getCurrentDate();
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

  toggleNewPatient = (new_patient) => {
    return (e) => {
      this.setState({
        new_patient
      })
    }
  }
  toggleVisitType = (in_person) => {
    return (e) => {
      this.setState({
        in_person
      })
    }
  }

  clearReason = () => {
    return (e)=> {
      this.setState({
        reason: ""
      })
    }
  }

  updateReason() {
    return (e) => this.setState({ reason: e.currentTarget.value })
  }

  render() {
    console.log(this.state)

    const currentUser = this.props.currentUser;
    let userInsuranceValue = "Click to select"
    if (currentUser) {
      const userInsuranceObj = this.props.insurances[currentUser.plan_id]
      if (userInsuranceObj) {
        let userInsuranceCarrier = userInsuranceObj.carrier
        let userInsurancePlan = userInsuranceObj.plan
        userInsuranceValue = `${userInsuranceCarrier} - ${userInsurancePlan}`
      }
    }

    return(
      <div className="appointment-form-container">
        <form action="" className="appointment-form">
          <h2 >Book an appointment for free</h2>

          {/* <div className="question-label">What's your insurance plan?</div>
          <input type="text"  value={userInsuranceValue} /> */}

          <div className="question-label">What's the reason for your visit?</div>
          <input type="text"  
            value={this.state.reason} 
            onChange={this.updateReason()}
            onClick={this.clearReason()}/>

          <div className="question-label">Has the patient seen this doctor before?</div>
          <div className="radio-selections-container">
            <div className="radio-selection" onClick={this.toggleNewPatient(true)}>
              <input type="radio"  
                checked={this.state.new_patient === true}/>
              <div>No</div>
            </div>
            <div className="radio-selection" onClick={this.toggleNewPatient(false)} >
              <input type="radio"  
                checked={this.state.new_patient === false}/>
              <div>Yes</div>
            </div>
          </div>

          <div className="question-label">Choose the type of appointment</div>
          <div className="radio-selections-container">
            <div className="radio-selection" onClick={this.toggleVisitType(true)}>
              <input type="radio" 
                checked={this.state.in_person === true}/>
              <div>In-person</div>
            </div>
            <div className="radio-selection" onClick={this.toggleVisitType(false)}>
              <input type="radio" 
                checked={this.state.in_person === false}/>
              <div>Video visit</div>
            </div>
          </div>

          {/* <div className="question-label">Select an available date</div>
          <input type="date" id="appointmentDate" />

          <div className="question-label">Select an available time</div>
          <input type="time" id="appointmentTime" /> */}

          <input type="submit" value="Continue booking" />
        </form>
      </div >
    )
  }
}

export default AppointmentForm