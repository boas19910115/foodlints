import ActionType from './actionTypeEnum'
import { FavCollection } from 'types/favorite.type'

type RxAction = {
  type: ActionType
  payload: any
}

interface SetCurrentFavCollections extends RxAction {
  type: ActionType.SET_CURRENT_FAV_COLLECTIONS
  payload: FavCollection[]
}

export type FavoriteActionType = SetCurrentFavCollections
