import React from "react";

import {selectPlans} from '../../reducers/selectors'

class ModalSelectInsurance extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: null,
      hios_id: "",
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

    console.log(userInsuranceValue)
    return (
      <div>
        <div onClick={() => this.handleSelection(this.props.plan_id)}>{userInsuranceValue}</div>
        <div onClick={this.toCarrierSelection}>choose a different insurance</div>
      </div>
    )
  }

  toCarrierSelection = () => {
    this.setState({
      step: "carrierSelection"
    })
  }

  renderCarrierSelection() {
    const insuranceCarrierObjects = {
      "Anthem": "27603",
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
      "Western": "93689"
    }
    return(
      <div>
        {Object.keys(insuranceCarrierObjects).map((carrier, i) => {
          return <div className="carrier-selection" 
                      key={i}
            onClick={() => this.toPlanSelection(insuranceCarrierObjects[carrier], carrier)}>{carrier}</div>
          })}
      </div>
    )
  }

  toPlanSelection = (hios_id, carrier) => {
    this.setState({
      hios_id,
      carrier,
      step: "planSelection"
    })
    this.props.fetchInsurances(hios_id).then(() => {
      this.setState(
        { insurance_list: selectPlans(this.props.insurances, this.state.hios_id) }
      )
    })
  }

  renderPlanSelection() {    
    if (this.state.insurance_list) {
      console.log(this.state.insurance_list)
      return (
        <div>
          {this.state.insurance_list.map(insurance => (
            <div key={insurance.plan_id}>{insurance.plan}</div>
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

  renderPages() {
    if (this.state.step === "carrierSelection") {
      return this.renderCarrierSelection()
    }
    if (this.state.step === "planSelection") {
      return this.renderPlanSelection()
    }
    if (this.props.plan_id) {
      return this.renderCurrentInsurance()
    }
  }

  render () {
    console.log(this.props.plan_id)
    return (
      <div className="select-insurance-container ">
        <div className="close-icon-container">
          <img src="/images/times-solid.svg" 
            alt="close" 
            onClick={this.props.closeModal}/>
        </div>
        {this.renderPages()}

      </div>
    )
  }
}

export default ModalSelectInsurance;