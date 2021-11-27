import React from "react";

class ModalInsurances extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.modal) {
      document.body.style.overflow = 'hidden'
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  handleCloseModal = () => {
    this.props.closeModal();
  }

  render() {
    console.log(this.props.insurances)
    return (
      <>
        <div className="insurances-modal">
          <div className="insurance-list">
            <div className="close" onClick={this.handleCloseModal}>&times;</div>
          </div>
        </div>
        <div className="overlay"/>
      </>
    )
  }
}

export default ModalInsurances;