import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB1U074Lyc_JpBsBCjb8W6VDseB330_I90",
  authDomain: "notes-eefd8.firebaseapp.com",
  projectId: "notes-eefd8",
  storageBucket: "notes-eefd8.appspot.com",
  messagingSenderId: "798736969011",
  appId: "1:798736969011:web:009a1e1519ac493466a246",
  measurementId: "G-MZ9F5WD6Q8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);