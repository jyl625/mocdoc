import React from "react";

import {selectProvidersAppointmentTimes} from '../../reducers/selectors'

class AvailabilityGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pageOffSet: 0,
      selected: ""
    }
  }

  providerAddress() {
    const provider = this.props.provider
    let fullAddress = `${provider.address_1}, `
    if (provider.address_2) {
      fullAddress += `${provider.address_2}, `
    }
    return fullAddress + `${provider.city}, ` + `${provider.state} `
  }

  columnHeaderDay(offset) {
    let dateStringObj = this.day(offset)

    return(
      <div className="date-container">
        <div className="date-detail">{dateStringObj.dayOfWeek}</div>
        <div className="date-detail">{dateStringObj.monthDay}</div>
      </div>
    )
  }

  day(offset) {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + offset)
    const dateString = dateObj.toLocaleString("en-US", { 
      timeZone: "America/Los_Angeles", 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })

    const [dayOfWeek, monthDay, year] = dateString.split(", ")

    const dateStringObj = {
      dayOfWeek,
      monthDay,
      year
    }

    return dateStringObj;
  }



  availabilityDay(offset, appointments) {
    let dateObj = this.day(offset)

    const firstAppointmentSlot = 9
    const lastAppointmentSlot = 16
    const maxAvailability = 5

    const availabilities = []
    const comparableFormats = []

    let nextAppointmentSlot = firstAppointmentSlot

    while (availabilities.length < maxAvailability && nextAppointmentSlot <= lastAppointmentSlot) {

      // comparable format is ex. 2021-12-02T10:00
      let comparableFormat = this.formatToComparableFormat(offset, nextAppointmentSlot)
      // debugger
      if (!appointments.includes(comparableFormat)) {
        comparableFormats.push(comparableFormat)
        availabilities.push(Object.assign({}, dateObj, { hr: nextAppointmentSlot, min: 0 }))
      }
      nextAppointmentSlot += 1;

    }  

    
    const empty_slots_count = maxAvailability - availabilities.length
    for (let i = 0; i < empty_slots_count; i++) {
      availabilities.push(null);
    }
    
    return (
      availabilities.map((availability, idx) => {
        if (availability === null) {
          return <div className="empty-availability" key={idx}></div>
        } else {
          const selected = (this.state.selected === comparableFormats[idx]) ? " selected" : ""
          return <div className={`availability-container${selected}`}
                      key={idx}
            onClick={this.handleSelect(comparableFormats[idx])}>{this.renderTime(availability)}</div>
        }
      })
    )
  }

  handleSelect = (availability) => {
    return (e) => {
      this.setState({
        selected: availability
      })
      this.props.updateDateTime(availability)
    }
  }

  formatToComparableFormat(offset, nextAppointmentSlot) {
    let tempDateObj = new Date();
    tempDateObj.setDate(tempDateObj.getDate() + offset)

    let dateString = tempDateObj.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    let [month, day, year] = dateString.split("/")

    month = (parseInt(month) < 10) ? `0${month}` : month
    day = (parseInt(day) < 10) ? `0${day}` : day
    let time = (nextAppointmentSlot < 10) ? `0${nextAppointmentSlot}` : `${nextAppointmentSlot}`

    // comparable format is ex. 2021-12-02T10:00
    return `${year}-${month}-${day}T${time}:00`
  }


  renderTime({hr, min}) {
    let timeStr="";
    timeStr = (min < 10) ? `:0${min}` : `:${min}`
    if (hr < 12) {
      timeStr = `${hr}${timeStr} AM`
    } else if (hr === 12) {
      timeStr = `${hr}${timeStr} PM`
    } else {
      timeStr = `${hr-12}${timeStr} PM`
    }
    return timeStr;
  }

  providersAppointments() {
    return selectProvidersAppointmentTimes(this.props.appointments, this.props.provider)
  }

  render() {
    const appointments = this.providersAppointments();

    return (
      <div className="availability-grid-container">
        <div className="address">{this.providerAddress()}</div>
        <table>
          <thead>
            <tr>
              <th>{this.columnHeaderDay(1)}</th>
              <th>{this.columnHeaderDay(2)}</th>
              <th>{this.columnHeaderDay(3)}</th>
              <th>{this.columnHeaderDay(4)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.availabilityDay(1, appointments)}</td>
              <td>{this.availabilityDay(2, appointments)}</td>
              <td>{this.availabilityDay(3, appointments)}</td>
              <td>{this.availabilityDay(4, appointments)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default AvailabilityGrid