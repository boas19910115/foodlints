import * as firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/auth'
import { User } from 'types/user.type'
import { setCurrentUser } from 'store/actions/userActions'
import store from 'store'

const firebaseConfig = {
  apiKey: 'AIzaSyA4ALClv4-xnnUaDkHSuVwc_SMDBZuSA3c',
  authDomain: 'foodlints.firebaseapp.com',
  databaseURL: 'https://foodlints.firebaseio.com',
  projectId: 'foodlints',
  storageBucket: 'foodlints.appspot.com',
  messagingSenderId: '472011747344',
  appId: '1:472011747344:web:3588925441a78614bd5a95',
  measurementId: 'G-MKYQ5CCK2F',
}

const fireApp = firebase.initializeApp(firebaseConfig, 'Foodlints')

const fireFunctions = fireApp.functions()

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

export { firebase, fireApp, fireFunctions }

fireApp.auth().onAuthStateChanged(function (user) {
  if (user) {
    const userExtracted = getUserData(user)
    store.dispatch(setCurrentUser(userExtracted))
    localStorage.setItem('foodlints-isSignIn', 'true')
  } else {
    store.dispatch(setCurrentUser(null))
    localStorage.setItem('foodlints-isSignIn', 'false')
  }
})
