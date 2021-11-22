import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBarContainer from "./nav_bar/nav_bar_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import {AuthRoute} from '../util/route_util'

const App = () => (
  <>
    <Switch>
      <AuthRoute exact path="/createuser/details" component={SignupFormContainer} />
      <AuthRoute exact path="/signin" component={LoginFormContainer} />
      <Route path="/" component={NavBarContainer}/>
    </Switch>
  </>
)


export default App