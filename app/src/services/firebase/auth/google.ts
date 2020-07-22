import { fireApp, firebase } from '../init'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export function googleSignin(): Promise<firebase.auth.UserCredential> {
  return new Promise((resolve, reject) => {
    fireApp
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(resolve)
      .catch(reject)
  })
}

export default googleAuthProvider
