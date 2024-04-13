// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-56a2f.firebaseapp.com",
  projectId: "blog-app-56a2f",
  storageBucket: "blog-app-56a2f.appspot.com",
  messagingSenderId: "793234763431",
  appId: "1:793234763431:web:b5a411ca7b4b2cc9327582"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);