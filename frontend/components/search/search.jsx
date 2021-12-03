import React from "react";

import { Link } from 'react-router-dom';

import NavBarContainer from '../nav_bar/nav_bar_container';
import SearchBarContainer from '../search_bar/search_bar_container';

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const [planIdQ, specialtyQ] = this.checkUrl()
    console.log(planIdQ)
    console.log(specialtyQ)
  }

  componentDidUpdate() {
    this.checkUrl()
  }

  checkUrl() {
    let [planIdQ, specialtyQ] = this.props.location.search.slice(1).split("&")

    planIdQ = planIdQ.slice(10)
    specialtyQ = specialtyQ.slice(10)

    if (!(planIdQ.length === 14 || planIdQ.length === 0)) {
      this.props.history.push("/")
    }

    return [planIdQ, specialtyQ]
  }

  render() {

    console.log(this.props)
    return (
      <>
        {/* {this.props.modal ? <ModalLoginFormContainer/> : null} */}
        <NavBarContainer />
        <SearchBarContainer />
        <div className="search-container">SEARCH RESULTS</div>
      </>
    )
  }
}

export default Search