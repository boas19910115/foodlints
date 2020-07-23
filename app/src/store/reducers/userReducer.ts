import ActionType from 'store/actionTypes/actionTypeEnum'
import { UserActionType } from 'store/actionTypes/userActionTypes'
import { UserState } from './stateTypes'

const initState: UserState = {
  currentUser: null,
}

export function userReducer(
  state = initState,
  action: UserActionType
): UserState {
  switch (action.type) {
    case ActionType.SET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
