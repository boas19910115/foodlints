import * as firebase from 'firebase/app';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyA4ALClv4-xnnUaDkHSuVwc_SMDBZuSA3c',
  authDomain: 'foodlints.firebaseapp.com',
  databaseURL: 'https://foodlints.firebaseio.com',
  projectId: 'foodlints',
  storageBucket: 'foodlints.appspot.com',
  messagingSenderId: '472011747344',
  appId: '1:472011747344:web:3588925441a78614bd5a95',
  measurementId: 'G-MKYQ5CCK2F',
};

const fireApp = firebase.initializeApp(firebaseConfig, 'Foodlints');

const fireFunctions = fireApp.functions();

export { fireApp, fireFunctions };
