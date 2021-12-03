import React from "react";

import { Link } from 'react-router-dom';

import NavBarContainer from '../nav_bar/nav_bar_container';
import SearchBarContainer from '../search_bar/search_bar_container';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = ({
      searchResults: null
    })

    this.resetSearchResult = this.resetSearchResult.bind(this)
  }

  componentDidMount() {
    const [planIdQ, specialtyQ] = this.checkUrl()

    if (this.props.currentUser) {
      this.props.fetchCurrentSession().then(() => {
        this.props.fetchProviders(planIdQ, specialtyQ).then(() => {
          this.setState({
            searchResults: Object.keys(this.props.providers)
          })
        })
      })
    } else {
      this.props.fetchProviders(planIdQ, specialtyQ).then(() => {
        this.setState({
          searchResults: Object.keys(this.props.providers)
        })
      })
    }

    // if (this.state.searchResults === null) {
      // this.props.fetchProviders(planIdQ, specialtyQ).then(() => {
      //   this.setState({
      //     searchResults: Object.keys(this.props.providers)
      //   })
      // })
    // }
  }

  componentDidUpdate() {
    this.checkUrl()
  }

  resetSearchResult(newState) {
    this.setState({
      searchResults: newState
    })
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

  renderResults() {
    if (this.state.searchResults === null) {
      return <div>Searching...</div>
    } else if (this.state.searchResults.length === 0) {
      return <div>No Result Found :(</div>
    } else if (this.state.searchResults.length > 0) {
      return (
        <>
          {this.renderResultSumamry()}
          {this.listProviders()}
        </>
      )
    }
  }

  renderResultSumamry() {
    return (
      <div className="result-summary">
        <div className="summary-detail">
          {`Total of ${this.state.searchResults.length} providers found in Los Angeles`}
        </div>
      </div>
    )
  }

  providerSpecialtyType(provider) {
    const specialties = provider.specialties.map(specialty_code => (
      this.props.specialties[specialty_code].specialty_name
    ))
    if (specialties.length > 0) {
      return specialties.join(", ") + ` ${provider.provider_type}`
    } else {
      return provider.provider_type
    }
  }

  acceptedCarriers(provider) {
    if (provider.insurance_carriers.length > 0) {
      return (
        <>
          <div>{`Accepting following insurance carriers`}</div>
          <div>{`${provider.insurance_carriers.join(", ")}`}</div>  
        </>
      )
    }
  }

  listProviders() {
    return (
      this.state.searchResults.map(id => {
        const provider = this.props.providers[id]
        return (
          <div key={id} className="search-item">
            <div className="search-image-container">
              <div className="place-holder-img"></div>
            </div>
            <div className="details-container">
              <div className="details-name">
                <Link to={`doctor/${provider.id}`}>{provider.name}</Link>
              </div>
              <div className="details-type">
                {this.providerSpecialtyType(provider)}
              </div>
              <div className="details-address-container">
                <div className="details-address">{provider.address_1}</div>
                <div className="details-address">{provider.address_2}</div>
                <div className="details-address">{`${provider.city}, ${provider.state}`}</div>
              </div>
              <div className="details-carriers">
                {this.acceptedCarriers(provider)}
              </div>
            </div>
          </div>
        )
      })
    )

    
    // if (this.state.searchResults === null) {
    //   return <div>Searching...</div>
    // } else if (this.state.searchResults.length === 0) {
    //   return <div>No Result Found :(</div>
    // } else if (this.state.searchResults.length > 0) {
    //   return (
    //     this.state.searchResults.map(id => {
    //       return (
    //         <div key={id} className="search-item-container">
    //           {this.props.providers[id].name}
    //         </div>
    //       )
    //     })
    //   )
    // }
  }

  render() {

    return (
      <>
        <NavBarContainer />
        <SearchBarContainer resetSearchResult={this.resetSearchResult}/>
        <div className = "search-result-main">
          {this.renderResults()}

        </div>
      </>
    )
  }
}

export default Search