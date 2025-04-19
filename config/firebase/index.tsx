// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getDatabase, ref, set } from "firebase/database"; // Firebase Realtime Database functions

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXcMsDQuk2-k71aDERL7tR3-PXFDiZz0c",
  authDomain: "crud-mission.firebaseapp.com",
  projectId: "crud-mission",
  storageBucket: "crud-mission.firebasestorage.app",
  messagingSenderId: "186885799070",
  appId: "1:186885799070:web:127d5e70e0f8936c470f8f",
  databaseURL: "https://crud-mission-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const db = getDatabase(app);

// Export the app, auth, and db for use in other files
export { app, auth, db };
