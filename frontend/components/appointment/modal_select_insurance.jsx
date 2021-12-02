import React from "react";

import {selectPlans} from '../../reducers/selectors'

class ModalSelectInsurance extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: null,
      carrier: "",
      plan_id: "",
      insurance_list: null
    }
  }

  renderCurrentInsurance() {
    const userInsuranceObj = this.props.insurances[this.props.plan_id]
    const userInsuranceCarrier = userInsuranceObj.carrier
    const userInsurancePlan = userInsuranceObj.plan
    const userInsuranceValue = `${userInsuranceCarrier} - ${userInsurancePlan}`

    return (
      <div>
        <div className="current-insurance" onClick={() => this.handleSelection(this.props.plan_id)}>{userInsuranceValue}</div>
        <div className="current-insurance" onClick={this.toCarrierSelection}>choose a different insurance</div>
      </div>
    )
  }

  toCarrierSelection = () => {
    this.setState({
      step: "carrierSelection"
    })
  }

  renderCarrierSelection() {
    const carriers = [
      "Anthem", 
      "Blue Shield", 
      "Bright", 
      "Chinese Community", 
      "HealthNet", 
      "Kaiser", 
      "L.A. Care", 
      "Molina", 
      "Oscar", 
      "Sharp", 
      "Valley", 
      "Western", 
      "Self-pay"
    ]
    return(
      <div>
        {carriers.map((carrier, i) => {
          return <div className="carrier-selection" 
                      key={i}
            onClick={() => this.toPlanSelection(carrier)}>{carrier}</div>
          })}
      </div>
    )
  }

  toPlanSelection = (carrier) => {
    this.setState({
      carrier,
      step: "planSelection"
    })
    this.props.fetchInsurances(carrier).then(() => {
      this.setState(
        { insurance_list: selectPlans(this.props.insurances, this.state.carrier) }
      )
    })
  }



  renderPlanSelection() {    
    if (this.state.insurance_list) {
      return (
        <div>
          <div className="chosen-carrier">{this.state.carrier}</div>
          {this.state.insurance_list.map(insurance => (
            <div key={insurance.plan_id}
              className="plan-selection"
              onClick={() => this.handleSelection(insurance.plan_id)}>{insurance.plan}</div>
          ))}
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }

  handleSelection(plan_id) {
    this.props.closeModal();
    this.props.updatePlanId(plan_id);
  }

  renderSteps() {
    if (this.state.step === "carrierSelection") {
      return this.renderCarrierSelection()
    }
    if (this.state.step === "planSelection") {
      return this.renderPlanSelection()
    }
    if (this.props.plan_id) {
      return this.renderCurrentInsurance()
    } else {
      return this.renderCarrierSelection()
    }
  }

  render () {
    return (
      <div className="select-insurance-container ">
        <div className="close-icon-container">
          <img src="/images/times-solid.svg" 
            alt="close" 
            onClick={this.props.closeModal}/>
        </div>
        {this.renderSteps()}

      </div>
    )
  }
}

export default ModalSelectInsurance;