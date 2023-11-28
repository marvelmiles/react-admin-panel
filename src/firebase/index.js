import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-admin-panel-4c471.firebaseapp.com",
  projectId: "react-admin-panel-4c471",
  storageBucket: "react-admin-panel-4c471.appspot.com",
  messagingSenderId: "15587322968",
  appId: "1:15587322968:web:b4d2fffbd2275bc3c3ee2d",
  measurementId: "G-5LYCQ2PL7Z"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(
  app,
  process.env.REACT_APP_FIREBASE_BUCKET_URL
);
