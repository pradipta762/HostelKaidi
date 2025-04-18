// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2l_75R3MYzVjZ0qga_CgSvGAiE-pxTk8",
  authDomain: "hostelkaidi-17fe9.firebaseapp.com",
  projectId: "hostelkaidi-17fe9",
  storageBucket: "hostelkaidi-17fe9.appspot.com",
  messagingSenderId: "42641040258",
  appId: "1:42641040258:web:f383df7a6ba3a5f0d4659b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
