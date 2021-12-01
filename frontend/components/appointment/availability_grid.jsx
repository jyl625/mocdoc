import React from "react";

class AvailabilityGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pageOffSet: 0,
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

  availabilityDay(offset) {
    let dateObj = this.day(offset)
    
    const firstAppointmentSlot = 9
    const lastAppointmentSlot = 16
    const maxAvailability = 5

    const availabilities = []

    let nextAppointmentSlot = firstAppointmentSlot
    while (availabilities.length < maxAvailability && nextAppointmentSlot <= lastAppointmentSlot) {
      availabilities.push(Object.assign({}, dateObj, {hr: nextAppointmentSlot, min: 0}))
      nextAppointmentSlot += 1;
    }

    console.log(availabilities)

    return (
      availabilities.map(availability => (
          <div className="availability-container">{this.renderTime(availability)}</div>
        ))
    )
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

  render() {
    console.log(this.props.provider)
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
              <td>{this.availabilityDay(1)}</td>
              <td>{this.availabilityDay(2)}</td>
              <td>{this.availabilityDay(3)}</td>
              <td>{this.availabilityDay(4)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default AvailabilityGrid