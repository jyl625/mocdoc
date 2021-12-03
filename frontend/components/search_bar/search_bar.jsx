import React from 'react'
import { Link } from 'react-router-dom';

import ModalSelectInsuranceContainer from "../appointment/modal_select_insurance_container";

import { withRouter } from 'react-router';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      planId: "",
      specialty: "Search specialty",
      specialtySuggestion: false
    }

    this.updatePlanId = this.updatePlanId.bind(this)
    this.openSpecialtyModal = this.openSpecialtyModal.bind(this)
  }

  //for dev only
  randDoctorId() {
    return Math.floor(Math.random() * 14257 + 1)
  }

  componentDidMount() {
    // this.props.fetchSpecialties("")
  }

  planName(plan_id) {
    const userInsuranceObj = this.props.insurances[plan_id]
    let userInsuranceCarrier = userInsuranceObj.carrier
    let userInsurancePlan = userInsuranceObj.plan
    return `${userInsuranceCarrier} - ${userInsurancePlan}`
  }

  openInsurancesModal = (e) => {
    this.props.openModal("selectInsurance");
  }

  renderSelectInsuranceModal() {
    // console.log(this.props)
    if (this.props.modal.includes("selectInsurance")) {
      let planId;
      if (this.props.currentUser) {
        planId = this.props.currentUser.plan_id
      } else {
        planId = null;
      }
      return <ModalSelectInsuranceContainer
        plan_id={planId}
        updatePlanId={this.updatePlanId}
        insurances={this.props.insurances} />
    } else {
      return null
    }
  }

  renderSpecialtySuggestion() {
    if (this.state.specialtySuggestion) {
    // if (this.props.modal.includes("specialtySuggestion")) {
      console.log(this.props.specialties)
      const nameOnly = Object.values(this.props.specialties).map(specialtyObj => (
        specialtyObj.specialty_name
      ))

      const sorted = nameOnly.sort((a,b) => ((a > b) ? 1 : -1))

      return (
        <>
          <div className="close-icon-container">
            <img src="/images/times-solid.svg"
              alt="close"
              onClick={() => this.setState({specialtySuggestion: false})} />
          </div>
          {sorted.map((name, idx) => {
            return <div key={idx}
              className="specialty-suggestion"
              onClick={() => this.handleSpecialtySelection(name)}>{name}</div>
            }
          )}
        </>
      )
    }
  }

  handleSpecialtySelection(name) {
    this.setState({ 
      specialty: name,
      specialtySuggestion: false
    })
  }

  updatePlanId(planId) {
    this.setState({
      planId
    })
  }

  updateSpecialty() {
    return (e) => {
      console.log(e)
      this.setState({specialty: e.currentTarget.value})
      this.props.fetchSpecialties(e.currentTarget.value)

    }
  }

  openSpecialtyModal() {
    console.log(this.state.specialtySuggestion)
    this.setState({ specialtySuggestion: true })
    if (this.state.specialty === "Search specialty") {
      this.setState({ specialty: "" })
      this.props.fetchSpecialties("")
    } else {
      this.props.fetchSpecialties(this.state.specialty)
    }
      
    console.log("specialty modal opened")
    // this.props.openModal("specialtySuggestion");
    
  }

  handleSearch() {
    const specialtyQ = ((this.state.specialty === "Search specialty") ? "" : this.state.specialty)
    const planIdQ= (this.state.planId)

    this.props.history.push(`/search?insurance=${planIdQ}&specialty=${specialtyQ}`)
  }

  renderGreetings() {
    if (this.props.match.path === '/search') {
      return null
    } else {
      return (
        <div className="greetings">
          <h1>Find local doctors </h1>
          <h1>Who takes your insurance</h1>
        </div>
      )
    }
  }

  determineBarType() {
    if (this.props.match.path === '/search') {
      return "search-bar-container-short"
    } else {
      return "search-bar-container"
    }
  }

  render () {
    console.log("state", this.state)
    return (
      // <div>testing</div>
      <div className={this.determineBarType()}>
        {this.renderGreetings()}
        <div className="search-section">
          <div className="search-form">
            <input type="text"
              className="specialty-filter"
              value={(this.state.specialty)}
              onClick={this.openSpecialtyModal}
              onChange={this.updateSpecialty()} />
            {/* <div className="specialty-suggestion-container">
              {this.renderSpecialtySuggestion()}
            </div> */}

            <input type="text"
              className="location-filter"
              value="Los Angeles, CA"
              readOnly />

            <input type="text"
              className="insurace-filter"
              value={this.state.planId ? (
                this.planName(this.state.planId)
              ) : "choose insurance"}
              onClick={this.openInsurancesModal}
              readOnly />
            {/* {this.renderSelectInsuranceModal()} */}

            <div className="search-icon-container">
              <img src="/images/search-solid.svg"
                alt="search"
                onClick={() => this.handleSearch()} />
            </div>

            {/* <div className="test">
              <Link to={`/doctor/${this.randDoctorId()}`}>
                <button>I'm Feeling Lucky</button>
              </Link>
            </div> */}
          </div>
          <div className="modal-section">
            {/* <div clasName="modal-container"> */}
              <div className="specialty-suggestion-container">
                {this.renderSpecialtySuggestion()}
              </div>
            {/* </div> */}
            {/* <div clasName="modal-container"></div> */}
              {this.renderSelectInsuranceModal()}
          </div>
        </div>
        

      </div>
    )
  }
}

export default withRouter(SearchBar)