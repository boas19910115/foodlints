import { combineReducers } from 'redux'
import { restaurantReducer } from './restaurantReducer'
import { userReducer } from './userReducer'
import { favoriteReducer } from './favoriteReducer'

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  user: userReducer,
  fav: favoriteReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
