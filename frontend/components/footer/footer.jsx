import React from 'react'

class Footer extends React.Component {
  constructor(props) {
    super(props )
  }

  render() {
    return (
      <footer>
        <div className="footer-links-container">
          <div><ul>
            <li className="footer-detail">Created by:</li>
            
            <li className="footer-detail">Jean Youn Lee</li>
          </ul></div>
          <div><ul>
            <li className="footer-detail">Find me on:</li>
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
                <a href="https://angel.co/u/jean-youn-lee" target="_blank">AngelList</a> 
              </div>
            </li>
          </ul></div>
        </div>
      </footer>
    )
  }
}

export default Footer