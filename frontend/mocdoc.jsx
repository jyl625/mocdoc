import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'

////////// FOR TESTING ONLY //////////
import * as APIUtil from './util/session_api_util'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  // const store = configureStore();

  ReactDOM.render(<div>React Not Working</div>, root)

  ////////// FOR TESTING ONLY //////////
  window.login = APIUtil.login
  window.logout = APIUtil.logout
  window.signup = APIUtil.signup
})