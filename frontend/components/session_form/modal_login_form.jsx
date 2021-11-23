import React from "react";
import { Link } from 'react-router-dom'

class ModalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.redirectHome = this.redirectHome.bind(this)
  }

  componentDidMount() {
    this.props.clearSessionErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state).then(() => this.props.closeModal());

  }

  redirectRoute = () => {
    this.props.history.push("/createuser/details");
  }

  update(field) {
    return (e => this.setState({ [field]: e.currentTarget.value }))
  }

  handleDemoLogin = () => {
    this.props.login({
      email: "demo@email.com",
      password: "111111"
    }).then(() => this.props.closeModal())
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
            <div className="close" onClick={() => this.props.closeModal()}>&times;</div>
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
        <div className="active" id="overlay"/>
      </>
    )
  }
}

export default ModalLoginForm