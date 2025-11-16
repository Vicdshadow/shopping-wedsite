# 🗺️ Navigation Map - CeHelen Platform

## Page Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    START HERE: index.html                        │
│                       (Login Page)                               │
│                                                                   │
│  • New user? → Link to signup.html                               │
│  • Existing user → Login                                         │
└────────────┬────────────────────────────────────────────────────┘
             │
             ├─ Valid Buyer Login → home.html (Buyer Dashboard)
             │
             └─ Valid Seller Login → seller dashboard.html (Seller Dashboard)

┌──────────────────────────────────────────────────────────────────┐
│              signup.html (User Registration)                      │
│                                                                   │
│  Account Type:                                                    │
│  • Select "Buyer" → creates buyer account → home.html            │
│  • Select "Seller" → creates seller account → seller dashboard   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│           BUYER DASHBOARD: home.html                             │
│                                                                   │
│  Navigation Menu:                                                │
│  ├─ 🛍️ Visit the Shop → shop.html                              │
│  ├─ 🛒 View Cart → cart.html                                    │
│  ├─ 📦 Order History → orders.html                              │
│  └─ 🚪 Logout → index.html                                      │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│           SHOPPING: shop.html                                    │
│                                                                   │
│  Features:                                                        │
│  • Search products by name/description/category                  │
│  • Add products to cart (quantity +1)                            │
│  • View product details                                          │
│                                                                   │
│  Navigation:                                                      │
│  ├─ ← Back to Home → home.html                                  │
│  ├─ 🛒 View Cart → cart.html                                    │
│  └─ 🚪 Logout → index.html                                      │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│           SHOPPING CART: cart.html                               │
│                                                                   │
│  Features:                                                        │
│  • View all cart items                                           │
│  • Adjust quantities (+ / - buttons)                             │
│  • Remove individual items                                       │
│  • Auto-calculate subtotal, tax (10%), total                     │
│  • Checkout button → saves order to database                     │
│                                                                   │
│  After Checkout:                                                 │
│  → orders.html (auto-redirect after placing order)              │
│                                                                   │
│  Navigation:                                                      │
│  └─ ← Continue Shopping → shop.html                             │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│          ORDER HISTORY: orders.html                              │
│                                                                   │
│  Features:                                                        │
│  • Display all buyer's orders                                    │
│  • Show order items with quantities and prices                   │
│  • Display order totals and status                               │
│  • Show order date and time                                      │
│                                                                   │
│  Navigation:                                                      │
│  ├─ ← Back to Home → home.html                                  │
│  ├─ 🛍️ Continue Shopping → shop.html                            │
│  └─ 🚪 Logout → index.html                                      │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│        SELLER DASHBOARD: seller dashboard.html                   │
│                                                                   │
│  Features:                                                        │
│  • Upload new products:                                          │
│    - Product name, price, category, description                  │
│    - Product image upload (to Firebase Storage)                  │
│  • View all your uploaded products                               │
│  • Delete products                                               │
│                                                                   │
│  Product Upload Flow:                                            │
│  1. Fill in product details                                      │
│  2. Select image file                                            │
│  3. Click "Upload Product"                                       │
│  4. Product appears immediately on shop.html                     │
│  5. Buyers can see and purchase                                  │
│                                                                   │
│  Navigation:                                                      │
│  ├─ ← Back to Home → home.html                                  │
│  └─ 🚪 Logout → index.html                                      │
└──────────────────────────────────────────────────────────────────┘
```

## Complete User Journey Maps

### Buyer's Complete Journey:

```
1. index.html (Login)
   ↓
2. signup.html (Create Account - Select "Buyer")
   ↓
3. home.html (Dashboard - Buyer)
   ├─ 🛍️ Visit Shop → shop.html
   │  ├─ Search & Browse Products
   │  ├─ Click "Add to Cart" → Items saved locally
   │  └─ Go to Cart → cart.html
   │
   ├─ 🛒 View Cart → cart.html
   │  ├─ Adjust Quantities
   │  ├─ Review Total + Tax
   │  ├─ Click "Checkout" → Order saved to database
   │  └─ Redirect → orders.html
   │
   ├─ 📦 Order History → orders.html
   │  └─ View all past orders with details
   │
   └─ 🚪 Logout → index.html (Back to start)
```

### Seller's Complete Journey:

```
1. index.html (Login)
   ↓
2. signup.html (Create Account - Select "Seller")
   ↓
3. seller dashboard.html (Seller Dashboard)
   ├─ Upload Products Section
   │  ├─ Enter: Name, Price, Category, Description
   │  ├─ Select: Product Image
   │  ├─ Click "Upload" → Image uploaded to Firebase Storage
   │  ├─ Product saved to database
   │  └─ Product immediately visible in shop.html
   │
   ├─ Your Products Section
   │  ├─ View all your uploaded products
   │  ├─ See product details
   │  └─ Delete products as needed
   │
   ├─ ← Back to Home → home.html
   │
   └─ 🚪 Logout → index.html (Back to start)
```

## Database Connections

```
Users Collection (users/)
├─ User ID (Firebase Auth)
│  ├─ fullName: string
│  ├─ email: string
│  ├─ role: "buyer" | "seller"
│  └─ createdAt: timestamp

Products Collection (products/)
├─ Product ID (auto-generated)
│  ├─ name: string
│  ├─ price: number
│  ├─ description: string
│  ├─ category: string
│  ├─ imageUrl: (Firebase Storage URL)
│  ├─ sellerId: (reference to seller user ID)
│  ├─ stock: number
│  └─ createdAt: timestamp

Orders Collection (orders/)
├─ Order ID (auto-generated)
│  ├─ buyerId: (reference to buyer user ID)
│  ├─ items: [
│  │  ├─ id: string
│  │  ├─ name: string
│  │  ├─ price: number
│  │  └─ quantity: number
│  │ ]
│  ├─ subtotal: number
│  ├─ tax: number
│  ├─ total: number
│  ├─ status: "pending" | "completed" | "cancelled"
│  └─ createdAt: timestamp
```

## File Dependencies

```
index.html
├─ style.css
└─ script.js
   └─ firebase-config.js

signup.html
├─ style.css
└─ signup.js
   └─ firebase-config.js

home.html
├─ style.css
└─ home.js
   └─ firebase-config.js

shop.html
├─ style.css
└─ shop.js
   └─ firebase-config.js

cart.html
├─ style.css
└─ cart.js
   └─ firebase-config.js

orders.html
├─ style.css
└─ orders.js
   └─ firebase-config.js

seller dashboard.html
├─ style.css
└─ seller-dashboard.js
   └─ firebase-config.js
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Firebase (Backend)                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Authentication (signUp, login, logout)                 │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  Firestore (Real-time Database)                          │   │
│  │  • users/ (Store user profiles)                          │   │
│  │  • products/ (Store seller products)                     │   │
│  │  • orders/ (Store buyer orders)                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  Firebase Storage (Image hosting)                        │   │
│  │  • products/ (Store product images)                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ▲          ▲           ▲            ▲
         │          │           │            │
      auth      products    orders        images
         │          │           │            │
         │          │           │            │
    ┌────┴──────────┴───────────┴────────────┴──────┐
    │         JavaScript Frontend                   │
    │  (shop.js, cart.js, orders.js, etc.)        │
    └────┬───────────────────────────────────────────┘
         │
    ┌────▼───────────────────────────────────────────┐
    │         HTML Pages (User Interface)            │
    │  (index.html, shop.html, cart.html, etc.)     │
    └───────────────────────────────────────────────┘
         │
         │ Styled with
         ▼
    ┌──────────────────────────────────────────────┐
    │         CSS Stylesheet                       │
    │  (style.css - responsive design)            │
    └──────────────────────────────────────────────┘
```

## Quick Navigation Reference

| Page    | URL                   | Purpose             | Connects To                                   |
| ------- | --------------------- | ------------------- | --------------------------------------------- |
| Login   | index.html            | User authentication | signup.html, home.html, seller-dashboard.html |
| Sign Up | signup.html           | User registration   | index.html, home.html, seller-dashboard.html  |
| Home    | home.html             | User dashboard      | index.html, shop.html, cart.html, orders.html |
| Shop    | shop.html             | Browse products     | home.html, cart.html, index.html              |
| Cart    | cart.html             | Manage cart         | shop.html, orders.html, index.html            |
| Orders  | orders.html           | View order history  | home.html, shop.html, index.html              |
| Seller  | seller-dashboard.html | Manage products     | home.html, index.html                         |

---

**All pages are interconnected and working smoothly! 🎉**
