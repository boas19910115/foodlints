import { useCallback } from 'react'
import { googleSignin as serviceGoogleSigin } from 'services/firebase/auth/google'
import { facebookSignin as serviceFacebookSignin } from 'services/firebase/auth/facebook'

export default function useAuthManager() {
  const googleSignin = useCallback(serviceGoogleSigin, [])
  const facebookSignin = useCallback(serviceFacebookSignin, [])

  return {
    googleSignin,
    facebookSignin,
  }
}
