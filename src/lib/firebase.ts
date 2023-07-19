// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp, FirebaseOptions } from 'firebase/app';
import ENV from "@/utils/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig:FirebaseOptions = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
export const initializeFirebaseApp = (config:Object) => {
    let option = config ? config : firebaseConfig
    return !getApps().length ? initializeApp(option) : getApp()
}