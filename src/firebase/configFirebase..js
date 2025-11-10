// Firebase initialization with local emulator support
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Detect local dev (Vite dev server or localhost)
const IS_LOCAL = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
);

// Production config (original ceratwit)
const PROD_CONFIG = {
  apiKey: "AIzaSyCmJLC57k2SQJsJNLY1yiwAasbdqwIWbp8",
  authDomain: "ceratwit.firebaseapp.com",
  projectId: "ceratwit",
  storageBucket: "ceratwit.appspot.com",
  messagingSenderId: "762641291153",
  appId: "1:762641291153:web:2d027121c241c2f420ec30"
};

// Local dev config (your new ceratwit-dev project)
// For emulator usage, only projectId must be accurate.
const DEV_CONFIG = {
  apiKey: "fake-api-key",
  authDomain: "ceratwit-dev.firebaseapp.com",
  projectId: "ceratwit-dev"
};

const app = initializeApp(IS_LOCAL ? DEV_CONFIG : PROD_CONFIG);
export const db = getFirestore(app);

// If running locally, route Firestore to the emulator
if (IS_LOCAL) {
  // Matches: Emulator UI shows Firestore at 127.0.0.1:8080
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}