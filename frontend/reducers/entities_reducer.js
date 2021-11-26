import { combineReducers } from 'redux';

import users from './users_reducer'
import providers from './providers_reducer'
import specialties from './specialties_reducer'
import insurances from './insurances_reducer'


const entitiesReducer = combineReducers({
  users, 
  providers,
  specialties,
  insurances,
})

export default entitiesReducer