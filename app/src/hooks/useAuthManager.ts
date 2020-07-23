import { useCallback, useMemo } from 'react'
import { googleSignin as serviceGoogleSigin } from 'services/firebase/auth/google'
import { facebookSignin as serviceFacebookSignin } from 'services/firebase/auth/facebook'
import { fireApp } from 'services/firebase/init'
import { useSelector } from 'react-redux'
import { RootState } from 'store/reducers'
import { User } from 'types/user.type'
import backendFunctions from 'services/firebase/functions'
import { useHistory, useLocation } from 'react-router-dom'
import { setCurrentUserThunk } from 'store/thunks'

function getUserData(firebaseUser?: firebase.User | null): User {
  if (firebaseUser) {
    return {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      favoriteCollections: [],
    }
  } else {
    throw Error('User does not exist')
  }
}

export default function useAuthManager() {
  const { currentUser } = useSelector((st: RootState) => st.user)
  const history = useHistory()
  const location = useLocation()

  const { from }: any = location.state || {
    from: { pathname: '/' },
  }

  const setUser = useCallback(
    async (user: User) => {
      backendFunctions.addMember(user)
      await setCurrentUserThunk(user)
      history.replace(from)
    },
    [from, history]
  )

  const googleSignin = useCallback(async () => {
    const res = await serviceGoogleSigin()
    setUser(getUserData(res.user))
    return res.user
  }, [setUser])

  const facebookSignin = useCallback(async () => {
    const res = await serviceFacebookSignin()
    setUser(getUserData(res.user))
    return res.user
  }, [setUser])
  const isSignedIn = useMemo(() => !!currentUser, [currentUser])

  const signOut = useCallback(() => fireApp.auth().signOut(), [])

  return {
    currentUser,
    googleSignin,
    facebookSignin,
    isSignedIn,
    setUser,
    signOut,
  }
}
