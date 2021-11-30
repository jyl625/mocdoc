import React from "react";

class ModalSelectInsurance extends React.Component {
  constructor(props) {
    super(props)
  }

  renderCurrentInsurance() {
    let userInsuranceValue = "I'm paying for myself"

    if (this.props.plan_id) {
      const userInsuranceObj = this.props.insurances[this.props.plan_id]
      let userInsuranceCarrier = userInsuranceObj.carrier
      let userInsurancePlan = userInsuranceObj.plan
      userInsuranceValue = `${userInsuranceCarrier} - ${userInsurancePlan}`
    }
    return <div>{userInsuranceValue}</div>
  }


  renderInsuranceCarriers() {
    const carriers = {
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
        <div>
          {this.renderCurrentInsurance()}
        </div>

      </div>
    )
  }
}

export default ModalSelectInsurance;