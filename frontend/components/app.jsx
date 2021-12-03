import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomeContainer from "./home/home_container";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import DoctorShowContainer from './doctor/doctor_show_container'
import PatientShowContainer from "./patient/patient_show_container";
import PatientPastAppointmentIndexContainer from "./past_appointment/patient_past_appt_index_container"
import BookAndReviewContainer from "./review_and_book/review_and_book_container";
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import SearchContainer from "./search/search_container";
import Footer from './footer/footer'

const App = () => (
  <>
    <Switch>
      <AuthRoute exact path="/createuser/details" component={SignupFormContainer} />
      <AuthRoute exact path="/signin" component={LoginFormContainer} />
      <Route exact path="/doctor/:id" component={DoctorShowContainer}/>
      <ProtectedRoute exact path="/patient/pastappointments" component={PatientPastAppointmentIndexContainer}/>
      <ProtectedRoute exact path="/patient" component={PatientShowContainer}/>
      <Route exact path="/" component={HomeContainer}/>
      <ProtectedRoute exact path="/reviewandbook/:id" component={BookAndReviewContainer}/>
      <Route path="/search" component={SearchContainer} />
      <Route render={() => <Redirect to={{ pathname: "/" }} />} />
    </Switch>
    <Footer/>
  </>
)


export default App