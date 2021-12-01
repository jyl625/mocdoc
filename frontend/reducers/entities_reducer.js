import { combineReducers } from 'redux';

import users from './users_reducer'
import providers from './providers_reducer'
import specialties from './specialties_reducer'
import insurances from './insurances_reducer'
import appointments from './appointments_reducer';

const entitiesReducer = combineReducers({
  users, 
  providers,
  specialties,
  insurances,
  appointments,
})

export default entitiesReducer