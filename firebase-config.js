// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU3YDVxqqwhIq3NfYuQfWpn9Z4tc6MHP4",
  authDomain: "cehelen-project.firebaseapp.com",
  projectId: "cehelen-project",
  storageBucket: "cehelen-project.firebasestorage.app",
  messagingSenderId: "465861264378",
  appId: "1:465861264378:web:f84c6df7b9f28c7eb21a43",
  measurementId: "G-F3FY2QEB9Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
