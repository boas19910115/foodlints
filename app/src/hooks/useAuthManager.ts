import { useCallback } from 'react'
import { googleSignin as serviceGoogleSigin } from 'services/firebase/auth/google'
import { facebookSignin as serviceFacebookSignin } from 'services/firebase/auth/facebook'
import { fireApp } from 'services/firebase/init'

export default function useAuthManager() {
  const googleSignin = useCallback(serviceGoogleSigin, [])
  const facebookSignin = useCallback(serviceFacebookSignin, [])
  const isSignedIn = useCallback(() => fireApp.auth().currentUser, [])

  return {
    googleSignin,
    facebookSignin,
    isSignedIn,
  }
}
