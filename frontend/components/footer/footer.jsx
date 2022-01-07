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
            <li className="footer-detail-title">Created by:</li>
            
            <li className="footer-detail">Jean Youn Lee</li>
          </ul></div>
          <div><ul>
            <li className="footer-detail-title">Find me on:</li>
            <li>
              <div className="footer-detail">
                <a href="https://github.com/jyl625/mocdoc" target="_blank">
                  <img src="images/github.svg" alt="github-logo" id="github-logo" />
                </a>
                <a href="https://github.com/jyl625/mocdoc" target="_blank">GitHub</a>
              </div>
            </li>
            <li>
              <div className="footer-detail">
                <a href="https://www.linkedin.com/in/jeanyounlee/" target="_blank">
                  <img src="images/linkedin.svg" alt="linkedin-logo" id="linkedin-logo"/>  
                </a> 
                <a href="https://www.linkedin.com/in/jeanyounlee/" target="_blank">LinkedIn</a> 
              </div>
            </li>
            <li>
              <div className="footer-detail">
                <a href="https://angel.co/u/jean-youn-lee" target="_blank">
                  <img src="images/angellist.svg" alt="angellist-logo" id="angellist-logo" />
                </a> 
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