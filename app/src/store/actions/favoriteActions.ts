import ActionType from 'store/actionTypes/actionTypeEnum'
import { FavCollection } from 'types/favorite.type'
import { FavoriteActionType } from 'store/actionTypes/favoriteActionTypes'

export function setCurrentFavCollections(
  data: Array<FavCollection>
): FavoriteActionType {
  return {
    type: ActionType.SET_CURRENT_FAV_COLLECTIONS,
    payload: data,
  }
}
