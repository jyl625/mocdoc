import React from 'react'

import { selectPastAppts } from '../../reducers/selectors'
import NavBarContainer from '../nav_bar/nav_bar_container';
import { Link } from 'react-router-dom';

class PatientPastAppointmentIndex extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      appointmentLoaded: false
    }
  }

  componentDidMount() {
    if (!this.state.appointmentLoaded) {
      this.props.fetchCurrentSession().then(() => {
        this.setState({
          appointmentLoaded: true
        })
      })
    }
  }

  renderPastAppointments() {
    if (this.state.appointmentLoaded === true) {
      const allAppointments = this.props.appointments
      const currentUser = this.props.currentUser
      if (Object.keys(allAppointments).length !== 0) {
        const userAppointments = (selectPastAppts(currentUser, allAppointments))
        return userAppointments.map(appointment => (
          <div key={appointment.id} className="past-appointment-item">
            <div className="appointment-icon-container">
              {/* <img className="review"
                onClick={() => this.handleCreateReview(appointment.id)}
                src="" alt="edit button" /> */}
            </div>
            <h1>You had an appointment on {this.stringifyDate(appointment.appointment_time)}</h1>
            <span>with    </span>
            <span>
              <Link className="doctor-link" to={`/doctor/${appointment.provider_id}`}>
                {`${this.props.providers[appointment.provider_id].name}`}
              </Link>
            </span>
            <div className="appointment-details">
              <p>Reason for your visit: {`${appointment.reason}`}</p>
              <p>New patient visit: {appointment.new_patient ? "Yes" : "No"}</p>
              <p>Appointment type: {appointment.in_person ? "In-person Visit" : "Video Visit"}</p>
            </div>
          </div>
        ))
      } 
    } else {
      return <div>Loading...</div>
    }
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
      minute: '2-digit'
    })
    return `${dateString} at ${timeString}`
  }

  render() {
    return (
      <div className="past-appointment-page">
        <NavBarContainer/>
        <div className="past-appointment-index">
          <div className="past-appointment-container">
            <h1>Your past appointments</h1>
            {this.renderPastAppointments()}
          </div>
        </div>
      </div>
    )
  }
}

export default PatientPastAppointmentIndex