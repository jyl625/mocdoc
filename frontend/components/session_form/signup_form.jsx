import React from 'react';
import {Link} from 'react-router-dom'

class SignupForm extends React.Component {
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
    this.props.signup(this.state);
  }

  update(field) {
    return (e => this.setState({ [field]: e.currentTarget.value}))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create an account</h3>
        <Link to="/signin">Already have one? Log in.</Link>
        <label>Enter your email
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
        <input type="submit" value="Save and Continue" />
      </form>
    )
  }
}

export default SignupForm

