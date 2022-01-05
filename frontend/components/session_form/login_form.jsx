import React from "react";
import { Link } from 'react-router-dom'
import FormNavBar from '../nav_bar/form_nav_bar'

class LoginForm extends React.Component {
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
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleLoginAndRedirect(this.state)
  }

  redirectToSignUp = () => {
    this.props.history.push("/createuser/details");
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
      if (res.type === "RECEIVE_CURRENT_USER") {
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
        <FormNavBar currPath={this.props.currPath}/>
        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="form-title">Log in</div>
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
          <input type="button" value="Demo Login" 
                  className="demo-login"onClick={this.handleDemoLogin}/>
          <ul>
            {this.showErrors()}
          </ul>

          <h3><span>or</span></h3>
          
          <input type="button" value="Sign up with email" 
              className="sign-up" onClick={this.redirectToSignUp} />
        </form>
      </>
    )
  }
}

export default LoginForm