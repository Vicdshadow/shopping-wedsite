// signup.js
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Handle form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!role) {
    alert("Please select Buyer or Seller");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save extra user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      role,
      createdAt: new Date().toISOString(),
    });

    alert("Account created successfully!");

    // Redirect based on role
    if (role === "seller") {
      window.location.href = "seller-dashboard.html";
    } else {
      window.location.href = "home.html";
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("Signup failed: " + error.message);
  }
});
