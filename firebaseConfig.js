// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import {getAuth} from 'firebase/auth';


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1jmhapVim1pm1SyvfbhvmjgZxWT3rvMA",
  authDomain: "shoplist-9c9cf.firebaseapp.com",
  projectId: "shoplist-9c9cf",
  storageBucket: "shoplist-9c9cf.appspot.com",
  messagingSenderId: "382244951826",
  appId: "1:382244951826:web:62259e76c0f369bd2b85cb",
  measurementId: "G-Y6S11JLF7L"
};

// Initialize Firebase
 export const FIREBASE_APP = initializeApp(firebaseConfig);
 export const FIREBASE_DB = getFirestore(FIREBASE_APP);
//  export const FIREBASE_AUTH=getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);