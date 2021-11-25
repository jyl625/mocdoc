import React from 'react'

import NavBarContainer from '../nav_bar/nav_bar_container';

class DoctorShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProvider(this.props.providerId)
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
                <div>{this.props.provider.city}, {this.props.provider.state}</div>
              </div>
              <div className="about">
                <div>{this.props.provider.npi}</div>
                <div>{this.props.provider.provider_type}</div>
                <div>{this.props.provider.address_1}</div>
                <div>{this.props.provider.address_2}</div>
                <div>{this.props.provider.zip_code}</div>
                <div>{this.props.provider.latitude}</div>
                <div>{this.props.provider.longitude}</div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>Doctor Show Page is Loading</div>
      )
    }
  }
}

export default DoctorShow