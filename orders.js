// orders.js
import { db, auth } from "./firebase-config.js";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  currentUser = user;
  loadOrders();
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

async function loadOrders() {
  const ordersList = document.getElementById("ordersList");

  if (!currentUser) return;

  try {
    const q = query(
      collection(db, "orders"),
      where("buyerId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      ordersList.innerHTML = `
        <div class="empty-orders">
          <h2>No orders yet</h2>
          <p>Start shopping to create your first order!</p>
          <a href="shop.html" style="color: #a233d6; font-weight: bold;">🛍️ Go to Shop</a>
        </div>
      `;
      return;
    }

    ordersList.innerHTML = "";
    const orders = [];

    snapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort by date descending
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    orders.forEach((order) => {
      const orderCard = document.createElement("div");
      orderCard.className = "order-card";

      const orderDate = new Date(order.createdAt).toLocaleDateString();
      const orderTime = new Date(order.createdAt).toLocaleTimeString();

      let itemsHTML = "";
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item) => {
          itemsHTML += `
            <div class="order-item">
              <div>
                <div class="item-name">${item.name}</div>
                <div class="item-qty-price">Qty: ${
                  item.quantity
                } × $${item.price.toFixed(2)}</div>
              </div>
              <div style="font-weight: bold;">$${(
                item.price * item.quantity
              ).toFixed(2)}</div>
            </div>
          `;
        });
      }

      const statusClass = order.status || "pending";
      const statusText = order.status
        ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
        : "Pending";

      orderCard.innerHTML = `
        <div class="order-header">
          <div>
            <div class="order-id">Order #${order.id.substring(0, 8)}</div>
          </div>
          <span class="order-status ${statusClass}">${statusText}</span>
        </div>
        <div class="order-items">
          ${itemsHTML}
        </div>
        <div class="order-totals">
          <div>
            <div style="color: #666; font-size: 0.9rem;">Subtotal: $${
              order.subtotal ? order.subtotal.toFixed(2) : "N/A"
            }</div>
            <div style="color: #666; font-size: 0.9rem;">Tax: $${
              order.tax ? order.tax.toFixed(2) : "N/A"
            }</div>
          </div>
          <div class="order-total">Total: $${
            order.total ? order.total.toFixed(2) : "N/A"
          }</div>
        </div>
        <div class="order-date">Ordered: ${orderDate} at ${orderTime}</div>
      `;

      ordersList.appendChild(orderCard);
    });
  } catch (error) {
    console.error("Error loading orders:", error);
    ordersList.innerHTML = '<p class="loading">Error loading orders</p>';
  }
}
