// cart.js
import { auth, db } from "./firebase-config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  currentUser = user;
  displayCart();
});

function displayCart() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some items to get started!</p>
        <a href="shop.html" style="color: #a233d6; font-weight: bold;">← Continue Shopping</a>
      </div>
    `;
    updateTotals();
    return;
  }

  cartItemsContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="item-controls">
        <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
        <span style="width: 30px; text-align: center;">${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
        <strong style="margin-left: 1rem; min-width: 80px; text-align: right;">$${itemTotal.toFixed(
          2
        )}</strong>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  updateTotals();
}

function updateTotals() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

window.increaseQuantity = function (index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
};

window.decreaseQuantity = function (index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }
  }
};

window.removeFromCart = function (index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
};

window.checkout = async function () {
  if (!currentUser) {
    alert("Please log in first");
    window.location.href = "index.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  try {
    // Add order to Firestore
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    await addDoc(collection(db, "orders"), {
      buyerId: currentUser.uid,
      items: cart,
      subtotal: subtotal,
      tax: tax,
      total: total,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    alert("✓ Order placed successfully!\n\nTotal: $" + total.toFixed(2));

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to orders page
    window.location.href = "orders.html";
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Error placing order: " + error.message);
  }
};
