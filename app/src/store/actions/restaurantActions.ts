import { RestaurantName } from 'types/restaurant.type'
import { RestaurantActionType } from 'store/actionTypes/restaurantActionTypes'
import ActionType from 'store/actionTypes/actionTypeEnum'

export function setAllRestaurantNames(
  data: Array<RestaurantName>
): RestaurantActionType {
  return {
    type: ActionType.SET_ALL_RESTAURANT_NAMES,
    payload: data,
  }
}
