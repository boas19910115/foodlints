import * as firebase from 'firebase/app'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export function googleSignin(): Promise<firebase.auth.UserCredential> {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(resolve)
      .catch(reject)
  })
}

export default googleAuthProvider
