import React from 'react'

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
        <div>{this.props.provider.name}</div>
      )
    } else {
      return (
        <div>Doctor Show Page is Loading</div>
      )
    }
  }
}

export default DoctorShow