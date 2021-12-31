// import firebase from "firebase";
import firebase from 'firebase/compat/app'
// import 'firebase/storage'
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC9CEZ3IYx5DGMw9g2cgOogiPAfHz5Bl0g",
  authDomain: "netmovie-6c388.firebaseapp.com",
  projectId: "netmovie-6c388",
  storageBucket: "netmovie-6c388.appspot.com",
  messagingSenderId: "927691450062",
  appId: "1:927691450062:web:932e124250651e15e7d29f",
  measurementId: "G-QFNMKVX7PJ"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
