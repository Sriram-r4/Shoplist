// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import {getAuth} from 'firebase/auth';
import { API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,SENDER_ID ,APP_ID,MEASUREMENT_ID} from "@env"


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain:AUTH_DOMAIN ,
  projectId:PROJECT_ID ,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
//  export const FIREBASE_AUTH=getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);