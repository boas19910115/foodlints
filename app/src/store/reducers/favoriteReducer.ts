import ActionType from 'store/actionTypes/actionTypeEnum'
import { FavState } from './stateTypes'
import { FavoriteActionType } from 'store/actionTypes/favoriteActionTypes'

const initState: FavState = {
  currentFavCollections: [],
}

export function favoriteReducer(
  state = initState,
  action: FavoriteActionType
): FavState {
  switch (action.type) {
    case ActionType.SET_CURRENT_FAV_COLLECTIONS: {
      return {
        ...state,
        currentFavCollections: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
