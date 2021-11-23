import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'

////////// FOR TESTING ONLY //////////
// import * as APIUtil from './util/session_api_util'
import { login, logout, signup } from './actions/session_actions'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  let store;
  if (window.currentUser) {
    const { currentUser } = window;
    const { id } = currentUser;
    const preloadedState = {
      entitities: {
        users: {
          [id]: currentUser
        }
      },
      session: { id }
    };
    store = configureStore(preloadedState);


    delete window.currentUser;

  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store}/>, root)

  ////////// FOR TESTING ONLY //////////
  window.login = login
  window.logout = logout
  window.signup = signup

  window.getState = store.getState;
  window.dispatch = store.dispatch;
})