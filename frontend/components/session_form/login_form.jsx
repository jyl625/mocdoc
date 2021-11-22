import React from "react";
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.login(this.state);
  }

  update(field) {
    return (e => this.setState({ [field]: e.currentTarget.value }))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Link to="/createuser/details">Sign up with email</Link>
        <div>or</div>
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
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default LoginForm