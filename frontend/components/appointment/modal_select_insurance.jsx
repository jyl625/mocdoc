import React from "react";

class ModalSelectInsurance extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: null,
      carrier: "",
      plan_id: ""
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
        <div onClick={this.nextStep}>choose a different insurance</div>
      </div>
    )
  }

  nextStep = () => {
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
        {
          Object.keys(insuranceCarrierObjects).map((carrier, i) => {
            return <div className="carrier-selection" key={i}>{carrier}</div>
          })
        }
      </div>
    )
  }

  handleSelection(plan_id) {
    this.props.closeModal();
    this.props.updatePlanId(plan_id);
  }

  renderPages() {
    if (this.state.step === "carrierSelection") {
      return this.renderCarrierSelection()
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