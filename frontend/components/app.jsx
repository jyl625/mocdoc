import React from "react";
import { Route } from "react-router-dom";
import NavBarContainer from "./nav_bar/nav_bar_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import {AuthRoute} from '../util/route_util'

const App = () => (
  <>
    <Route path="/" component={NavBarContainer}/>
    <AuthRoute exact path="/createuser/details" component={SignupFormContainer} />
    <AuthRoute exact path="/signin" component={LoginFormContainer} />


  </>
)


export default App