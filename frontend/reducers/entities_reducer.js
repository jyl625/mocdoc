import { combineReducers } from 'redux';

import users from './users_reducer'
import providers from './providers_reducer'

const entitiesReducer = combineReducers({
  users, 
  providers,
})

export default entitiesReducer