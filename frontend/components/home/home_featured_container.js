import { connect } from 'react-redux';

import { fetchFeaturedProviders } from '../../actions/provider_actions';

import HomeFeatured from './home_featured';

const mapStateToProps = ({entities}) => ({
  providers: entities.providers.all,
  specialties: entities.specialties.providers
})

const mapDispatchToProps = (dispatch) => ({
  fetchFeaturedProviders: () => dispatch(fetchFeaturedProviders())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeatured);