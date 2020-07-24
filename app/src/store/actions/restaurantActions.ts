import { RestaurantName, RestaurantWeekday } from 'types/restaurant.type'
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

export function setRestaurantQueried(
  data: Array<RestaurantWeekday>
): RestaurantActionType {
  return {
    type: ActionType.SET_RESTAURANT_QUERIED,
    payload: data,
  }
}

export function setCurrentPageNumber(data: number): RestaurantActionType {
  return {
    type: ActionType.SET_CURRENT_PAGE_NUMBER,
    payload: data,
  }
}
