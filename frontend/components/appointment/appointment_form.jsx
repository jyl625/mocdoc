import React from "react";
import { withRouter } from 'react-router';

import AvailabilityGridContainer from "./availability_grid_container";
import ModalSelectInsuranceContainer from "./modal_select_insurance_container";

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      plan_id: "",
      reason: "Input a reason",
      new_patient: null,
      in_person: null,
      appointmentYear: null,
      appointmentMonth: null,
      appointmentDay: null,
      appointmentHour: null,
      appointmentMin: null,
      formErrors: null,
      loggedOut: null
    }

    this.updatePlanId = this.updatePlanId.bind(this)
    this.updateDateTime = this.updateDateTime.bind(this)
  }


  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchCurrentSession()
    }
  }

  componentDidUpdate() {
    if (this.props.currentUser && this.state.plan_id === "") {
      this.setState(
        { plan_id: this.props.currentUser.plan_id }
      )
    }
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

  renderSelectInsuranceModal() {
    if (this.props.modal.includes("selectInsurance")) {
      let plan_id;
      if (this.props.currentUser) {
        plan_id = this.props.currentUser.plan_id
      } else {
        plan_id = null;
      }
      return <ModalSelectInsuranceContainer 
                plan_id={plan_id} 
                updatePlanId={this.updatePlanId}/>
    } else {
      return null
    } 
  }

  openInsurancesModal = (e) => {
    this.props.openModal("selectInsurance");
  }

  updatePlanId(plan_id) {
    this.setState({
      plan_id
    })
  }

  planName(plan_id) {
    const userInsuranceObj = this.props.insurances[plan_id]
    let userInsuranceCarrier = userInsuranceObj.carrier
    let userInsurancePlan = userInsuranceObj.plan
    return `${userInsuranceCarrier} - ${userInsurancePlan}`
  }

  checkCoverage() {
    let coverageStatus
    if (this.state.plan_id) {
      if (this.props.accepted_plan_ids.includes(this.state.plan_id)) {
        coverageStatus = `In-network for ${this.props.provider.name}`
      } else {
        coverageStatus = `Out-of-network for ${this.props.provider.name}`
      }
    } else {
      coverageStatus = ""
    }
    return <div className="coverage-status">{coverageStatus}</div>
  }

  updateDateTime(dateTimeString) {
    const [date, time] = dateTimeString.split("T");
    const [year, month, day] = date.split("-")
    const [hour, min] = time.split(":")

    this.setState({
      appointmentYear: year,
      appointmentMonth: month,
      appointmentDay: day,
      appointmentHour: hour,
      appointmentMin: min,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.validateFormAndSubmit()
  }

  validateFormAndSubmit() {
    const reason = this.state.reason;
    const plan_id = this.state.plan_id;
    const new_patient = this.state.new_patient;
    const in_person = this.state.in_person;

    // NEED TO REFACTOR 
    if (!this.props.currentUser) {
      this.setState({
        loggedOut: true
      })
    } else {
      this.setState({
        loggedOut: false
      })
      if (reason === "Input a reason" || reason === "" || plan_id === "" || new_patient === null || in_person === null) {
        this.setState({
          formErrors: true
        })
      } else {
        this.setState({
          formErrors: false
        })
        this.createFormObjectAndSubmit()
      }
    }
  }


  createFormObjectAndSubmit() {
    const appointment = {
      year: this.state.appointmentYear,
      month: this.state.appointmentMonth,
      day: this.state.appointmentDay,
      hour: this.state.appointmentHour,
      min: this.state.appointmentMin,
      userId: this.props.currentUser.id,
      providerId: this.props.provider.id,
      reason: this.state.reason,
      newPatient: this.state.new_patient,
      inPerson: this.state.in_person,
      planId: this.state.plan_id //this!!!
    }
    this.props.createAppointment(appointment)
    this.props.history.push("/patient")
  }


  render() {
    return(
      <div className="appointment-form-container">
        <form onSubmit={this.handleSubmit} className="appointment-form">
          <h2 >Book an appointment for free</h2>

          <div className="question-label" >What's your insurance plan?</div>
          <input type="text" 
            className="insurance-choice"
            value={this.state.plan_id ? (
              this.planName(this.state.plan_id)
              ) : "choose insurance"}
            onClick={this.openInsurancesModal}
            readOnly/>
          {this.renderSelectInsuranceModal()}
          {this.checkCoverage()}

          <div className="question-label">What's the reason for your visit?</div>
          <input type="text"  
            value={this.state.reason} 
            onChange={this.updateReason()}
            onClick={this.clearReason()}/>

          <div className="question-label">Has the patient seen this doctor before?</div>
          <div className="radio-selections-container">
            <div className="radio-selection" onClick={this.toggleNewPatient(true)}>
              <input type="radio"  
                checked={this.state.new_patient === true}
                readOnly/>
              <div>No</div>
            </div>
            <div className="radio-selection" onClick={this.toggleNewPatient(false)} >
              <input type="radio"  
                checked={this.state.new_patient === false}
                readOnly/>
              <div>Yes</div>
            </div>
          </div>

          <div className="question-label">Choose the type of appointment</div>
          <div className="radio-selections-container">
            <div className="radio-selection" onClick={this.toggleVisitType(true)}>
              <input type="radio" 
                checked={this.state.in_person === true}
                readOnly/>
              <div>In-person</div>
            </div>
            <div className="radio-selection" onClick={this.toggleVisitType(false)}>
              <input type="radio" 
                checked={this.state.in_person === false}
                readOnly/>
              <div>Video visit</div>
            </div>
          </div>

          <AvailabilityGridContainer 
              provider={this.props.provider}
              updateDateTime={this.updateDateTime}/>

          <input type="submit" value="Continue booking" />
          <div className="form-errors">
            {this.state.formErrors ? "Please fill out all the required fields": ""}
          </div>
          <div className="form-errors">
            {this.state.loggedOut ? "Please log in to book an appointment": ""}
          </div>
        </form>
      </div >
    )
  }
}

export default withRouter(AppointmentForm)