import React from 'react';

class HomeFeatured extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchFeaturedProviders()
  }

  render() {
    return (
      <div>TESTING</div>
    )
  }
}

export default HomeFeatured