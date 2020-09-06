import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyCMPBHDJaqdzUBUEXOScNbf8P3hj8yeNNI',
  authDomain: 'yonder-booking-sync-45876.firebaseapp.com',
  databaseURL: 'https://yonder-booking-sync-45876.firebaseio.com',
  projectId: 'yonder-booking-sync-45876',
  storageBucket: 'yonder-booking-sync-45876.appspot.com',
  messagingSenderId: '808741774958',
  appId: '1:808741774958:web:a57f72c83b4551726d287f',
  measurementId: 'G-E8G8FZHVBK',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
// const usersCollection = db.collection('users');
const eventsCollection = db.collection('events');

// export utils/refs
export {
  db,
  auth,
  // usersCollection,
  eventsCollection,
};
