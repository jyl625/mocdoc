import React from "react";

class ModalInsurances extends React.Component {
  constructor(props) {
    super(props)

    this.state = {selected: []}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.modal) {
      document.body.style.overflow = 'hidden'
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  handleCloseModal = () => {
    this.props.closeModal();
  }

  renderInsuranceList() {
    return (
      <>
        {this.props.insurance_carriers.map((carrier, idx) => {
          return (
            <div key={idx}>
              <div 
                className="carrier"
                onClick={() => this.handleClick(carrier)}>{carrier}</div>
              {this.renderSelectPlans(carrier)}
            </div>
          )
          })
        }
      </>
    )
  }

  handleClick(carrier) {
    let newSelected
    if (!this.state.selected.includes(carrier)) {
      newSelected = [...this.state.selected]
      newSelected.push(carrier)
      this.setState({ selected: newSelected})
    } else {
      newSelected = this.state.selected.filter(selected => selected !== carrier)
      this.setState({ selected: newSelected})
    }
  }

  renderSelectPlans(carrier) {
    const selectedPlans = []
    Object.keys(this.props.insurances).forEach( id => {
      const plan_carrier = this.props.insurances[id].carrier
      if (plan_carrier === carrier && this.state.selected.includes(plan_carrier)) {
        selectedPlans.push(this.props.insurances[id].plan)
      }
    })
    return selectedPlans.sort().map((plan, idx) => (
      <div key={idx} className="plan">{plan}</div>
    ))
  }

  render() {
    return (
      <>
        <div className="insurances-modal">
          <div className="insurance-list">
            <div className="close-button-container">
              <img className="close" 
                  onClick={this.handleCloseModal}   
                  src="/images/times-solid.svg" alt="close button" />
            </div>
            <div className="modal-content">
              <h2>In-network Insurances</h2>
              {this.renderInsuranceList()}
            </div>
          </div>
        </div>
        <div className="overlay"/>
      </>
    )
  }
}

export default ModalInsurances;