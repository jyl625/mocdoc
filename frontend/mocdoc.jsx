import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  // const store = configureStore();

  ReactDOM.render(<div>React Not Working</div>, root)
})