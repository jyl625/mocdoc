import React from "react";
import { Link } from 'react-router-dom';

import NavBarContainer from "../nav_bar/nav_bar_container";

import { selectUpcomingAppts } from '../../reducers/selectors'

class PatientShow extends React.Component {
  constructor(props) {
    super(props)
  }

  // TESTING ONLY
  randDoctorId() {
    return Math.floor(Math.random() * 14257 + 1)
  }

  renderPatientBio() {
    const currentUser = this.props.currentUser;
    
    return (
      <div className="panel-left-item">
        <h1>{currentUser.first_name} {currentUser.last_name}</h1>
        <p>{currentUser.age} year old</p>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchCurrentSession();
  }

  // componentDidUpdate() {
  //   this.props.fetchCurrentSession();
  // }

  renderPatientInsurance() {
    const currentUser = this.props.currentUser;
    const userInsurance = this.props.insurances[currentUser.plan_id]

    if (userInsurance) {
      return (
        <div className="panel-left-item">
          <div className="insurance-title">Your insurance plans</div>
          <div className="insurance-subtitle">Stay in-network with your medical insurance plan</div>
          <div className="patient-insurance-container">
            <div>{userInsurance.carrier}</div>
            <div>{userInsurance.plan}</div>
          </div>
        </div>
      )
    } else {
      return null;
    }

  }

  renderUpcomingAppointments() {
    const allAppointments = this.props.appointments
    const currentUser = this.props.currentUser
    if (Object.keys(allAppointments).length !== 0) {
      const userAppointments = (selectUpcomingAppts(currentUser, allAppointments))
      return userAppointments.map(appointment => (
        <div key={appointment.id} className="panel-right-item">            
          <div className="appointment-icon-container">
            <img className="edit"
              onClick={() => this.handleEditAppointment(appointment.id)}
              src="/images/edit-regular.svg" alt="edit button" />
            <img className="delete"
              onClick={() => this.handleDeleteAppointment(appointment.id)}
              src="/images/trash-regular.svg" alt="delete button" />
          </div>
          <h1>You have an appointment on {this.stringifyDate(appointment.appointment_time)}</h1>
          <span>with </span>
          <span>
            <Link className="doctor-link" to={`/doctor/${appointment.provider_id}`}>
              {`${this.props.providers[appointment.provider_id].name}`}
            </Link>
          </span>
          <p>Reason for your visit: {`${appointment.reason}`}</p>
        </div>
      ))
    } else {
      return null
    }
  }

  handleDeleteAppointment = (appointmentId) => {
    this.props.deleteAppointment(appointmentId).then(() => {
      this.props.fetchCurrentSession();
    })
  }

  handleEditAppointment = (appointmentId) => {
    this.props.history.push(`/reviewandbook/${appointmentId}`)
  }

  stringifyDate(dateTimeString) {
    const dateObj = new Date(dateTimeString)
    const dateString = dateObj.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    // return dateString
    const timeString = dateObj.toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles", 
      hour: '2-digit', 
      minute: '2-digit' })
    return `${dateString} at ${timeString}`
  }

  render() {
    // if (this.props.currentUser && this.props.appointments) {
      return(
        <div className="patient-show">
          <NavBarContainer/>
          <div className="main-page">
            <div className="search-section">
              <div className="test">
                <Link to={`/doctor/${this.randDoctorId()}`}><button>I'm Feeling Lucky</button></Link>
              </div>
            </div>
            <div className="panel-container">
              <div className="panel-left">
                {this.renderPatientBio()}
                {this.renderPatientInsurance()}
              </div>
              <div className="panel-right">
                {this.renderUpcomingAppointments()}
              </div>
            </div>
          </div>
        </div>
      );
    // } else {
    //   <div>Patient's page loading...</div>
    // }
  }
}

export default PatientShow;