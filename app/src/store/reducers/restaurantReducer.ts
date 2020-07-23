import { RestaurantState } from './stateTypes'
import { RestaurantActionType } from 'store/actionTypes/restaurantActionTypes'
import ActionType from 'store/actionTypes/actionTypeEnum'

const initState: RestaurantState = {
  allRestaurantNames: [],
}

export function restaurantReducer(
  state = initState,
  action: RestaurantActionType
): RestaurantState {
  switch (action.type) {
    case ActionType.SET_ALL_RESTAURANT_NAMES: {
      return {
        ...state,
        allRestaurantNames: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
