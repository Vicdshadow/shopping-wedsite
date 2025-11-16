// home.js
import { auth, db } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Check if user is logged in and display their info
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  try {
    // Get user info from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      document.getElementById("userName").textContent =
        userData.fullName || "User";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("You have been logged out");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout error:", error);
    alert("Error logging out: " + error.message);
  }
});
