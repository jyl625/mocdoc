import React from "react";
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';

class ModalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearSessionErrors();
    if(this.props.modal.length > 0) {
      document.body.style.overflow = 'hidden'
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleLoginAndRedirect(this.state)
  }

  handleCloseModal = () => {
    this.props.closeModal();
  }


  update(field) {
    return (e => this.setState({ [field]: e.currentTarget.value }))
  }

  handleDemoLogin = () => {
    this.handleLoginAndRedirect({
      email: "demo@email.com",
      password: "111111"
    })
  }

  handleLoginAndRedirect = (loginCredentials) => {
    this.props.login(loginCredentials).then(res => {
      console.log("res is", res)
      if (res.type === "RECEIVE_CURRENT_USER") {
        this.props.closeModal()
        this.props.history.push("/patient")
      }
    })
  }


  showErrors() {
    return (
      this.props.errors.map((error, idx) => <li key={idx} 
                                              className="errorMessage"
                                            >{error}</li>
                            )
    )
  }

  render() {
    return (
      <>
        <div className="modal">
          <form onSubmit={this.handleSubmit} className="modal-login-form">
            <div className="close-button-container">
              <img className="close"
                onClick={this.handleCloseModal}
                src="/images/times-solid.svg" alt="close button" />
            </div>
            <h2>Login to book your appointment</h2>
            <label>Email address
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")} />
            </label>
            <label>Password
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")} />
            </label>
            <input type="submit" value="Log in"/>
            <input type="button" value="Demo Login" onClick={this.handleDemoLogin}/>
            <Link to="/createuser/details"><h3>New to Mocdoc? Create an account</h3></Link>
            <ul>
              {this.showErrors()}
            </ul>
          </form>
        </div>
        <div className="overlay"/>
      </>
    )
  }
}

export default withRouter(ModalLoginForm)