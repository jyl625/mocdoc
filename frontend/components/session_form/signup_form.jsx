import React from 'react';
import {Link} from 'react-router-dom'
import FormNavBar from '../nav_bar/form_nav_bar'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "", 
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "1900-01-01",
      planId: "40513CA0380001"
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearSessionErrors();
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }

  update(field) {
    return (e => this.setState({ [field]: e.currentTarget.value}))
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
        <FormNavBar currPath={this.props.currPath} />
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div className="form-header">
            <div className="form-title">Create an account</div>
            <Link to="/signin">Already have one? Log in.</Link>
          </div>
          <label>Your first name
            <input 
              type="text" 
              value={this.state.firstName}
              onChange={this.update("firstName")} />
          </label>
          <label>Enter last name
            <input 
              type="text" 
              value={this.state.lastName}
              onChange={this.update("lastName")} />
          </label>
          <label>Date of birth
            <input 
              type="date" 
              value={this.state.dateOfBirth}
              onChange={this.update("dateOfBirth")} />
          </label>
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
          <input type="submit" value="Save and Continue"/>
          <ul>
            {this.showErrors()}
          </ul>
        </form>
      </>
    )
  }
}

export default SignupForm

