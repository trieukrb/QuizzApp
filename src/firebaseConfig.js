// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-mwTo5O50RMTgBLbLwhrZIm9J5xrQyvc",
    authDomain: "toeicpratice-21c20.firebaseapp.com",
    projectId: "toeicpratice-21c20",
    storageBucket: "toeicpratice-21c20.firebasestorage.app",
    messagingSenderId: "496678654975",
    appId: "1:496678654975:web:7a95686bae87ca0a270dca",
    measurementId: "G-R190EZJ3W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);