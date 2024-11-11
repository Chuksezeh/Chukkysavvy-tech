// firebaseConfig.js
// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyA36MK85_or9b6AtlDHCyd0Qz7ya-cPQ8w",
    authDomain: "chukkytech-f61c2.firebaseapp.com",
    projectId: "chukkytech-f61c2",
    storageBucket: "chukkytech-f61c2.firebasestorage.app",
    messagingSenderId: "761594526752",
    appId: "1:761594526752:web:d31575d12d4957db489045"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
