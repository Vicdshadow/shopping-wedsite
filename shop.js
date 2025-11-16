// shop.js
import { auth, db } from "./firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
let allProducts = [];

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
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

async function loadProducts() {
  try {
    productList.innerHTML = '<p class="loading">Loading products...</p>';

    const snapshot = await getDocs(collection(db, "products"));
    allProducts = [];

    snapshot.forEach((doc) => {
      allProducts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (allProducts.length === 0) {
      productList.innerHTML =
        '<p class="empty-message">No products available yet</p>';
      return;
    }

    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    productList.innerHTML = '<p class="loading">Error loading products</p>';
  }
}

function displayProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML =
      '<p class="empty-message">No products match your search</p>';
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.imageUrl}" alt="${
      product.name
    }" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-category">${product.category || "Other"}</div>
        <div class="product-description">${product.description}</div>
        <button class="add-to-cart-btn" onclick="addToCart('${
          product.id
        }', '${product.name.replace(/'/g, "\\'")}', ${product.price})">
          🛒 Add to Cart
        </button>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// Search functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.category && product.category.toLowerCase().includes(searchTerm))
  );
  displayProducts(filtered);
});

// Add to cart function
window.addToCart = function (productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✓ ${productName} added to cart!`);
};
