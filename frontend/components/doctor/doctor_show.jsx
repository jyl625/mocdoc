import React from 'react'
import { HashLink } from 'react-router-hash-link';

import NavBarContainer from '../nav_bar/nav_bar_container';

class DoctorShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("fetch made")
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
      </>
    )
  }

  renderLocation() {
    const provider = this.props.provider
    return (
      <>
        <div className="subsection">Office Location</div>
        <div>{provider.address_1}</div>
        <div>{provider.address_2}</div>
        <div>{`${provider.city}, ${provider.state} ${provider.zip_code}`}</div>
        <div>{provider.latitude}</div>
        <div>{provider.longitude}</div>
      </>
    )
  }

  renderBackground() {
    const provider = this.props.provider
    return (
      <>
        <div className="subsection">Background</div>
        {this.listSpecialties()}
        <div>NPI number</div>
        <div>{this.props.provider.npi}</div>
      </>
    )
  }

  listSpecialties() {
    const specialty_ids = this.props.provider.specialties
    
    if (specialty_ids.length > 0) {
      return (
        <>
          <div>Specialties</div>
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
          <NavBarContainer/>
          <div className="main-page">
            <div className="appointment-form">Book an appointment for free</div>
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
                <div><HashLink smooth to={`/doctor/${this.props.provider.id}#insurances`}>Insurances</HashLink></div>
                <div><HashLink smooth to={`/doctor/${this.props.provider.id}#location`}>Location</HashLink></div>
                <div><HashLink smooth to={`/doctor/${this.props.provider.id}#background`}>Background</HashLink></div>
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
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="doctor-show">
          <NavBarContainer />
          <div className="main-page">
            <div>Doctor Show Page is Loading</div>
            <div>{this.props.match.params.id}</div>
          </div>
        </div>
      )
    }
  }
}

export default DoctorShow