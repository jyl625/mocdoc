import React from 'react'
import { HashLink } from 'react-router-hash-link';

import NavBarContainer from '../nav_bar/nav_bar_container';
import ModalInsurances from './modal_insurances';
import AppointmentFormContainer from '../appointment/appointment_form_container';

class DoctorShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProvider(this.props.match.params.id)
  }

  renderSpecialties() {
    const specialties = this.props.provider.specialties.map( specialty_code => (
      this.props.specialties[specialty_code].specialty_name
    ))
    return specialties.join(", ") + ` ${this.props.provider.provider_type}`
  }

  renderInsuranceCarriers() {
    return (
      <>
        <div className="subsection">In-network Insurances</div>
        {this.props.provider.insurance_carriers.map((carrier, i) => (
          <div className="carrier" key={i}>{carrier}</div>
        ))}
        <div className="more-plans">
          <span>
            {`${this.insurancePlanCount()} more in-network plans  `}
          </span>
          <span className="all-insurances" onClick={this.openInsurancesModal}>
            View All
          </span>
        </div>
      </>
    )
  }

  insurancePlanCount() {
    const count = this.props.provider.insurances.length;
    if (count < 10) {
      return count + "";
    } else {
      const numDigits = (count + "").length;
      const rounded = Math.floor(count / (10 ** (numDigits - 1))) * (10 ** (numDigits - 1))
      return rounded + "+";
    }
  }

  openInsurancesModal = () => {
    this.props.openModal("insurances");
  }

  renderLocation() {
    const provider = this.props.provider
    return (
      <>
        <div className="subsection">Office Location</div>
        <div className="address-container">
          <div>{provider.address_1}</div>
          <div>{provider.address_2}</div>
          <div>{`${provider.city}, ${provider.state} ${provider.zip_code}`}</div>
          {/* <div>{provider.latitude}</div>
          <div>{provider.longitude}</div> */}
        </div>
      </>
    )
  }

  renderBackground() {
    const provider = this.props.provider
    return (
      <>
        <div className="subsection">Background</div>
        <div className="details-container">
          {this.listSpecialties()}
        </div>
        <div className="details-container">
          <div className="details-header">NPI number</div>
          <div>{this.props.provider.npi}</div>
        </div>
      </>
    )
  }

  listSpecialties() {
    const specialty_ids = this.props.provider.specialties
    
    if (specialty_ids.length > 0) {
      return (
        <>
          <div className="details-header">Specialties</div>
          {specialty_ids.map(id => (<div key={id}>{this.props.specialties[id].specialty_name}</div>))}
        </>
      )
    } else {
      return null;
    }
    
  }


  render() {
    if (this.props.provider) {
      return (
        <div className="doctor-show">
          {this.props.modal.includes("insurances") ? <ModalInsurances
            insurances={this.props.insurances}
            modal={this.props.modal}
            insurance_carriers={this.props.provider.insurance_carriers}
            accepted_plan_ids={this.props.provider.insurances}
            closeModal={this.props.closeModal}
          /> : null}
          <NavBarContainer/>
          <div className="main-page">
            <div className="profile">
              <div className="intro">
                <div className="pic-container">
                  <div className="place-holder-img"></div>
                </div>
                <div className="info-container">
                  <div className="name">{this.props.provider.name}</div>
                  <div className="info-specialties">{this.renderSpecialties()}</div>
                  <div className="info-location">{this.props.provider.city}, {this.props.provider.state}</div>
                </div>
              </div>
              <div className = "page-hooks">
                <HashLink smooth to={`/doctor/${this.props.provider.id}#insurances`}><div>Insurances</div></HashLink>
                <HashLink smooth to={`/doctor/${this.props.provider.id}#location`}><div>Location</div></HashLink>
                <HashLink smooth to={`/doctor/${this.props.provider.id}#background`}><div>Background</div></HashLink>
              </div>

              <div id="insurances">
                {this.renderInsuranceCarriers()}
              </div>
              <div id="location">
                {this.renderLocation()}
              </div>
              <div id="background">
                {this.renderBackground()}
              </div>
              <div id="place-holder"></div>
            </div>
            <AppointmentFormContainer 
              accepted_plan_ids={this.props.provider.insurances}
              provider={this.props.provider}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="doctor-show">
          <NavBarContainer />
          <div className="main-page">
            <div className="loading-message">Doctor's Page is Loading...</div>
          </div>
        </div>
      )
    }
  }
}

export default DoctorShow