import ActionType from './actionTypeEnum';
import { RestaurantName } from 'types/restaurant.type';

interface SetAllResaurantNamesAction {
  type: ActionType.SET_ALL_RESTAURANT_NAMES;
  payload: RestaurantName[];
}

export type RestaurantActionType = SetAllResaurantNamesAction;
