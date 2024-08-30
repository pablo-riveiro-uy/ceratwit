// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmJLC57k2SQJsJNLY1yiwAasbdqwIWbp8",
  authDomain: "ceratwit.firebaseapp.com",
  projectId: "ceratwit",
  storageBucket: "ceratwit.appspot.com",
  messagingSenderId: "762641291153",
  appId: "1:762641291153:web:2d027121c241c2f420ec30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);