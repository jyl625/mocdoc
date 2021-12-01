import React from "react";
import AvailabilityGrid from "./availability_grid";

import ModalSelectInsuranceContainer from "./modal_select_insurance_container";

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

    this.updatePlanId = this.updatePlanId.bind(this)
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

  render() {
    console.log(this.state)
    return(
      <div className="appointment-form-container">
        <form action="" className="appointment-form">
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

          <AvailabilityGrid provider={this.props.provider}/>

          <input type="submit" value="Continue booking" />
        </form>
      </div >
    )
  }
}

export default AppointmentForm