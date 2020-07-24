import { RestaurantName, RestaurantWeekday } from 'types/restaurant.type'
import { User } from 'types/user.type'

export interface RestaurantState {
  allRestaurantNames: RestaurantName[]
  restaurantsQueriedByDateTime: RestaurantWeekday[]
  restaurantsQueriedByDateTimeDevied: RestaurantWeekday[][]
  pgnTotalPageCount: number
  pgnCurrentPageNumber: number
  pgnRowCountPerPage: number
}

export interface UserState {
  currentUser: User | null
}
