import React from 'react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  constructor(props) {
    super(props )
  }

  render() {
    return (
      <footer>
        <div className="footer-links-container">
          <ul>
            <li className="footer-detail">Created by:</li>
            
            <li className="footer-detail">Jean Youn Lee</li>
            <li>
              <div className="footer-detail">
                <a href="https://github.com/jyl625/mocdoc" target="_blank">GitHub</a>
              </div>
            </li>
            <li>
              <div className="footer-detail">
                <a href="https://www.linkedin.com/in/jeanyounlee/" target="_blank">LinkedIn</a> 
              </div>
            </li>
            <li>
              <div className="footer-detail">
                <a href="https://www.linkedin.com/in/jeanyounlee/" target="_blank">LinkedIn</a> 
              </div>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer