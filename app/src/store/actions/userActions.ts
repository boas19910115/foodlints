import ActionType from 'store/actionTypes/actionTypeEnum'
import { User } from 'types/user.type'
import { UserActionType } from 'store/actionTypes/userActionTypes'

export function setCurrentUser(data: User | null): UserActionType {
  return {
    type: ActionType.SET_USER,
    payload: data,
  }
}
