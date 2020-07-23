import { setCurrentUser } from './actions/userActions'
import { User } from 'types/user.type'
import store from 'store'

export const setCurrentUserThunk = (data: User): Promise<any> => {
  const { dispatch } = store
  return Promise.resolve(dispatch(setCurrentUser(data)))
}
