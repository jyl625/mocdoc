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
    return this.props.provider.insurance_carriers.map( carrier => (
      <div>{carrier}</div>
    ))
  }

  renderLocation() {
    const provider = this.props.provider
    return (
      <>
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
          {specialty_ids.map(id => (<div>{this.props.specialties[id].specialty_name}</div>))}
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
                <div className="name">{this.props.provider.name}</div>
                <div>{this.renderSpecialties()}</div>
                <div>{this.props.provider.city}, {this.props.provider.state}</div>
              </div>
              <div className = "page-hooks">
                <div><HashLink smooth to={`/doctor/${this.props.provider.id}#insurances`}>Insurances</HashLink></div>
                <div><HashLink smooth to={`/doctor/${this.props.provider.id}#location`}>Location</HashLink></div>
                <div><HashLink smooth to={`/doctor/${this.props.provider.id}#background`}>Background</HashLink></div>
              </div>
              <div className="insurances" id="insurances">In-network Insurances
                {this.renderInsuranceCarriers()}
              </div>
              <div className="location" id="location">Office Location
                {this.renderLocation()}
              </div>
              <div className="background" id="background">Background
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
          <div>Doctor Show Page is Loading</div>
          <div>{this.props.match.params.id}</div>
        </div>
      )
    }
  }
}

export default DoctorShow