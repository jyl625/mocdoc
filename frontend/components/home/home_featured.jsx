import React from 'react';
import { Link } from 'react-router-dom';

class HomeFeatured extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchFeaturedProviders()
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
      Object.keys(this.props.providers).map(id => {
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
  }

  render() {
    console.log("providers", this.props.providers)
    if (Object.keys(this.props.providers).length === 0)
      return null

    return (
      <div className="featured-section">
        <div>Featured Providers</div>
        <div className="featured-providers-list">
          {this.listProviders()}
        </div>
      </div>
    )
  }
}

export default HomeFeatured