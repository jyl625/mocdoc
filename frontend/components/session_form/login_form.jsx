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
    this.props.login(this.state);
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
          <input type="button" value="Sign up with email" onClick={this.redirectRoute} />
          <h3><span>or</span></h3>
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
          <ul>
            {this.showErrors()}
          </ul>
        </form>
      </>
    )
  }
}

export default LoginForm