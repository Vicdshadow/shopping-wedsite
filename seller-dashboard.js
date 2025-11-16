// seller-dashboard.js
import { auth, db, storage } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

let currentUser = null;

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  currentUser = user;
  loadProducts();
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

// File input change handler
const fileInput = document.getElementById("productImage");
fileInput.addEventListener("change", (e) => {
  const fileName = e.target.files[0]?.name || "";
  document.getElementById("fileName").textContent = fileName
    ? `✓ ${fileName}`
    : "";
});

// Product form submission
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("You must be logged in to upload products");
    return;
  }

  const productName = document.getElementById("productName").value.trim();
  const productPrice = parseFloat(
    document.getElementById("productPrice").value
  );
  const productCategory = document.getElementById("productCategory").value;
  const productDesc = document.getElementById("productDesc").value.trim();
  const imageFile = document.getElementById("productImage").files[0];

  if (!productName || !productPrice || !productDesc || !imageFile) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    const uploadBtn = document.querySelector(".upload-btn");
    uploadBtn.disabled = true;
    uploadBtn.textContent = "⏳ Uploading...";

    // Upload image to Firebase Storage
    const imageName = `${currentUser.uid}_${Date.now()}_${imageFile.name}`;
    const imageRef = ref(storage, `products/${imageName}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add product to Firestore
    await addDoc(collection(db, "products"), {
      sellerId: currentUser.uid,
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDesc,
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
      stock: 100, // Default stock
    });

    alert("✓ Product uploaded successfully!");
    document.getElementById("productForm").reset();
    document.getElementById("fileName").textContent = "";
    uploadBtn.disabled = false;
    uploadBtn.textContent = "🚀 Upload Product";

    loadProducts();
  } catch (error) {
    console.error("Upload error:", error);
    alert("Error uploading product: " + error.message);
    document.querySelector(".upload-btn").disabled = false;
    document.querySelector(".upload-btn").textContent = "🚀 Upload Product";
  }
});

// Load and display seller's products
async function loadProducts() {
  if (!currentUser) return;

  const productsList = document.getElementById("productsList");

  try {
    const q = query(
      collection(db, "products"),
      where("sellerId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      productsList.innerHTML =
        '<p class="loading">No products yet. Upload your first product!</p>';
      return;
    }

    productsList.innerHTML = "";

    snapshot.forEach((doc) => {
      const product = doc.data();
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.innerHTML = `
        <img src="${product.imageUrl}" alt="${
        product.name
      }" class="product-image" onerror="this.src='https://via.placeholder.com/250?text=No+Image'">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-desc">${product.description.substring(
          0,
          100
        )}...</div>
        <small style="color: #999;">${product.category}</small>
        <button class="delete-btn" onclick="deleteProduct('${
          doc.id
        }')">🗑️ Delete</button>
      `;
      productsList.appendChild(productItem);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    productsList.innerHTML = '<p class="loading">Error loading products</p>';
  }
}

// Delete product
window.deleteProduct = async function (productId) {
  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }

  try {
    await deleteDoc(doc(db, "products", productId));
    alert("✓ Product deleted successfully");
    loadProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Error deleting product: " + error.message);
  }
};
