import ActionType from './actionTypeEnum'
import { RestaurantName, RestaurantWeekday } from 'types/restaurant.type'

type RxAction = {
  type: ActionType
  payload: any
}

interface SetAllResaurantNamesAction extends RxAction {
  type: ActionType.SET_ALL_RESTAURANT_NAMES
  payload: RestaurantName[]
}

interface SetRestaurantsQueriedAction extends RxAction {
  type: ActionType.SET_RESTAURANT_QUERIED
  payload: RestaurantWeekday[]
}

interface SetCurrentPageNumberAction extends RxAction {
  type: ActionType.SET_CURRENT_PAGE_NUMBER
  payload: number
}

export type RestaurantActionType =
  | SetAllResaurantNamesAction
  | SetRestaurantsQueriedAction
  | SetCurrentPageNumberAction
