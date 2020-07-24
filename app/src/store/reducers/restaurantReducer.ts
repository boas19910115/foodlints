import { RestaurantState } from './stateTypes'
import { RestaurantActionType } from 'store/actionTypes/restaurantActionTypes'
import ActionType from 'store/actionTypes/actionTypeEnum'
import { RestaurantWeekday } from 'types/restaurant.type'

const initState: RestaurantState = {
  allRestaurantNames: [],
  restaurantsQueriedByDateTime: [],
  restaurantsQueriedByDateTimeDevied: [[]],
  pgnCurrentPageNumber: 1,
  pgnRowCountPerPage: 10,
  pgnTotalPageCount: 0,
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
    case ActionType.SET_RESTAURANT_QUERIED: {
      const { pgnRowCountPerPage } = state
      const dataCount = action.payload.length
      const pgnTotalPageCount = Math.floor(dataCount / 10) + 1

      const restaurantsQueriedByDateTimeDevied = action.payload.reduce<
        RestaurantWeekday[][]
      >((pre, cur, index) => {
        if (index % pgnRowCountPerPage === 0) {
          const newArr = [cur]
          pre.push(newArr)
          return [...pre]
        }
        pre[pre.length - 1].push(cur)
        return [...pre]
      }, [])
      return {
        ...state,
        pgnTotalPageCount,
        restaurantsQueriedByDateTime: action.payload,
        restaurantsQueriedByDateTimeDevied,
      }
    }

    case ActionType.SET_CURRENT_PAGE_NUMBER: {
      return {
        ...state,
        pgnCurrentPageNumber: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
