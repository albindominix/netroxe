// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-wpl2Tv_cE9UunlnGv2gCOUOmsl8IPFU",
  authDomain: "netroxe-7d305.firebaseapp.com",
  projectId: "netroxe-7d305",
  storageBucket: "netroxe-7d305.appspot.com",
  messagingSenderId: "935800692088",
  appId: "1:935800692088:web:ae015f02401a303b917c8d"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);