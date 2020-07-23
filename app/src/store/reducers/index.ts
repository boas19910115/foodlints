import { combineReducers } from 'redux'
import { restaurantReducer } from './restaurantReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
