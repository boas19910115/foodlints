import * as firebase from 'firebase/app'
import googleAuthProvider from './google'

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export function facebookSignin(): Promise<firebase.auth.UserCredential> {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(resolve)
      .catch(function (error) {
        const { code, credential } = error
        switch (code) {
          case 'auth/account-exists-with-different-credential':
            googleAuthProvider.setCustomParameters({
              // eslint-disable-next-line @typescript-eslint/camelcase
              login_hint: error.email,
            })
            firebase
              .auth()
              .signInWithPopup(googleAuthProvider)
              .then(function (result) {
                if (
                  result &&
                  result.user &&
                  result.user.linkAndRetrieveDataWithCredential
                ) {
                  result.user.linkWithCredential(credential)
                  resolve(result)
                } else {
                  reject(error)
                }
              })
            break
          default:
            reject(error)
            break
        }
      })
  })
}

export default facebookAuthProvider
