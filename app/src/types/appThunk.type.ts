import { ThunkAction } from 'redux-thunk'
import { RootState } from 'store/reducers'
import { Action } from 'redux'

export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<ActionType>
>
