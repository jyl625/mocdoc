import React from "react";
import { Link } from 'react-router-dom'

import AvailabilityGridContainer from "../appointment/availability_grid_container";
import ModalSelectInsuranceContainer from "../appointment/modal_select_insurance_container";

class ReviewAndBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planId: "",
      reason: "Input a reason",
      newPatient: null,
      inPerson: null,
      appointmentYear: null,
      appointmentMonth: null,
      appointmentDay: null,
      appointmentHour: null,
      appointmentMin: null,
      formErrors: null,
      loggedOut: null,
      loaded: false,
      insuranceLoaded: false
    }

    this.updatePlanId = this.updatePlanId.bind(this)
    this.updateDateTime = this.updateDateTime.bind(this)
  }

  componentDidMount() {
    this.props.fetchCurrentSession();
    this.props.requestAppointment(this.props.match.params.id).then(() => {
      // console.log("appointment",this.props.appointment)
      this.props.fetchInsurance(this.props.appointment.plan_id).then(() => {
        if (!this.state.loaded) {
          // console.log("this happens only once")
          this.setState({
            loaded: true,
            planId: this.props.appointment.plan_id,
            reason: this.props.appointment.reason,
            newPatient: this.props.appointment.new_patient,
            inPerson: this.props.appointment.in_person
          })
        }
      })
    })
  }

  planName(planId) {
    const userInsuranceObj = this.props.insurances[planId]
    let userInsuranceCarrier = userInsuranceObj.carrier
    let userInsurancePlan = userInsuranceObj.plan
    return `${userInsuranceCarrier} - ${userInsurancePlan}`
  }

  openInsurancesModal = (e) => {
    this.props.openModal("selectInsurance");
  }

  renderSelectInsuranceModal() {
    if (this.props.modal.includes("selectInsurance")) {
      let planId;
      if (this.props.currentUser) {
        planId = this.props.currentUser.plan_id
      } else {
        planId = null;
      }
      return <ModalSelectInsuranceContainer
        planId={planId}
        updatePlanId={this.updatePlanId} />
    } else {
      return null
    }
  }

  updatePlanId(planId) {
    this.setState({
      planId
    })
  }

  showCoverage() {
    const provider = this.props.providers[this.props.appointment.provider_id]

    let coverageStatus
    if (this.state.planId) {
      // console.log("provider", provider)
      if (provider.insurances.includes(this.state.planId)) {
        coverageStatus = `In-network for ${provider.name}`
      } else {
        coverageStatus = `Out-of-network for ${provider.name}`
      }
    } else {
      coverageStatus = ""
    }
    return <div className="coverage-status">{coverageStatus}</div>
  }

  clearReason = () => {
    return (e) => {
      this.setState({
        reason: ""
      })
    }
  }

  updateReason() {
    return (e) => this.setState({ reason: e.currentTarget.value })
  }

  toggleNewPatient = (newPatient) => {
    return (e) => {
      this.setState({
        newPatient
      })
    }
  }

  toggleVisitType = (inPerson) => {
    return (e) => {
      this.setState({
        inPerson
      })
    }
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
    const planId = this.state.planId;
    const newPatient = this.state.newPatient;
    const inPerson = this.state.inPerson;

    // NEED TO REFACTOR 
    if (!this.props.currentUser) {
      this.setState({
        loggedOut: true
      })
    } else {
      this.setState({
        loggedOut: false
      })
      if (reason === "Input a reason" || reason === "" || planId === "" || newPatient === null || inPerson === null) {
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
      id: this.props.match.params.id,
      year: this.state.appointmentYear,
      month: this.state.appointmentMonth,
      day: this.state.appointmentDay,
      hour: this.state.appointmentHour,
      min: this.state.appointmentMin,
      userId: this.props.currentUser.id,
      providerId: this.props.appointment.provider_id,
      reason: this.state.reason,
      newPatient: this.state.newPatient,
      inPerson: this.state.inPerson,
      planId: this.state.planId //this!!!
    }
    this.props.updateAppointment(appointment)
    this.props.updateUser({
      id: this.props.currentUser.id,
      planId: this.state.planId
    }).then(() => {
      this.props.history.push("/patient")
    })
  }

  // formFriendlyTime(timeString) {
  //   return timeString.slice(0,16)
  // }

  showCurrentApptTime() {
    const dateObj = new Date(this.props.appointment.appointment_time)
    const dateString = dateObj.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    // return dateString
    const timeString = dateObj.toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: '2-digit',
      minute: '2-digit'
    })
    return `${dateString} at ${timeString}`
  }

  coveredInsurance() {
    const provider = this.props.providers[this.props.appointment.provider_id]
    return provider.insurances.includes(this.state.planId)
  }

  render() {
    // console.log(this.state)
    if (this.props.appointment) {
      const appointment = this.props.appointment
      // console.log("appointment",appointment)
      return (
        <>
          <div className="form-nav-bar">
            <Link className="logo"to="/">Mocdoc</Link>
          </div>
          <div className="appointment-form-container">
            <form onSubmit={this.handleSubmit} className="appointment-form">
              <h2 >Book an appointment for free</h2>
    
              <div className="question-label" >What's your insurance plan?</div>
              <input type="text"
                className={this.coveredInsurance() ? "insurance-choice-covered" : "insurance-choice"}
                value={this.state.planId ? (
                  this.planName(this.state.planId)
                ) : "choose insurance"}
                onClick={this.openInsurancesModal}
                readOnly />
              {this.renderSelectInsuranceModal()}
              {this.showCoverage()}

              <div className="question-label">What's the reason for your visit?</div>
              <input type="text"
                value={this.state.reason}
                onChange={this.updateReason()}
                onClick={this.clearReason()} />

              <div className="question-label">Has the patient seen this doctor before?</div>
              <div className="radio-selections-container">
                <div className="radio-selection" onClick={this.toggleNewPatient(true)}>
                  <input type="radio"
                    checked={this.state.newPatient === true}
                    readOnly />
                  <div>No</div>
                </div>
                <div className="radio-selection" onClick={this.toggleNewPatient(false)} >
                  <input type="radio"
                    checked={this.state.newPatient === false}
                    readOnly />
                  <div>Yes</div>
                </div>
              </div>

              <div className="question-label">Choose the type of appointment</div>
              <div className="radio-selections-container">
                <div className="radio-selection" onClick={this.toggleVisitType(true)}>
                  <input type="radio"
                    checked={this.state.inPerson === true}
                    readOnly />
                  <div>In-person</div>
                </div>
                <div className="radio-selection" onClick={this.toggleVisitType(false)}>
                  <input type="radio"
                    checked={this.state.inPerson === false}
                    readOnly />
                  <div>Video visit</div>
                </div>
              </div>

              <div className="question-label">Currently Set As:</div>
              <div>{this.showCurrentApptTime()}</div>

              <AvailabilityGridContainer
                provider={this.props.providers[this.props.appointment.provider_id]}
                updateDateTime={this.updateDateTime} />
                {/* {this.formFriendlyTime(appointment.appointment_time)} */}

              <input type="submit" value="Save Changes" />
              <div className="form-errors">
                {this.state.formErrors ? "Please fill out all the required fields" : ""}
              </div>
              <div className="form-errors">
                {this.state.loggedOut ? "Please log in to book an appointment" : ""}
              </div>

            </form>
          </div>
        </>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default ReviewAndBook