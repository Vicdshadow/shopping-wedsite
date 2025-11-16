// script.js
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// LOGIN FORM HANDLER
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      // Sign in user
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        throw new Error("User profile not found");
      }

      const userData = userDoc.data();
      const role = userData.role;

      console.log("User logged in as:", role);
      alert("Welcome! Logging in as " + role);

      // Redirect based on role
      if (role === "seller") {
        window.location.href = "seller-dashboard.html";
      } else {
        window.location.href = "home.html";
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  });
}
