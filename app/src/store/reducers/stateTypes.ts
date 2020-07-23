import { RestaurantName } from 'types/restaurant.type'
import { User } from 'types/user.type'

export interface RestaurantState {
  allRestaurantNames: RestaurantName[]
}

export interface UserState {
  currentUser: User | null
}
