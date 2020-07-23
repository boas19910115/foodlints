import ActionType from './actionTypeEnum'
import { User } from 'types/user.type'

interface SetCurrentUserAction {
  type: ActionType.SET_USER
  payload: User | null
}

export type UserActionType = SetCurrentUserAction
