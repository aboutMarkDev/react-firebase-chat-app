// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-chat-app-v2.firebaseapp.com",
  projectId: "my-chat-app-v2",
  storageBucket: "my-chat-app-v2.firebasestorage.app",
  messagingSenderId: "984475613236",
  appId: "1:984475613236:web:ccfef7ae65b4e4fa1bb261",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
