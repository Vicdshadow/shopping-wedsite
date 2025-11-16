# CeHelen - E-Commerce Shopping Platform

Welcome to CeHelen, a fully functional e-commerce platform built with HTML, CSS, JavaScript, and Firebase!

## Features

### ✨ Key Features

- **User Authentication**: Sign up and login with role-based access (Buyer or Seller)
- **Product Management**: Sellers can upload products with images, descriptions, and prices
- **Shopping Cart**: Add/remove products, adjust quantities, and manage your cart
- **Order System**: Place orders and view order history
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Image Upload**: Upload product images directly to Firebase Storage
- **Real-time Database**: Uses Firebase Firestore for data management

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Firebase services)

### Installation

1. **Extract the files** to your desired location
2. **Open `index.html`** in your web browser to start using the platform

That's it! No installation or setup required.

## How to Use

### For Buyers

1. **Sign Up**

   - Click "Sign up" on the login page
   - Enter your details and select "Buyer" as account type
   - Click "Create Account"

2. **Browse Products**

   - Click "Visit the Shop" to see available products
   - Use the search bar to find specific products
   - Click on products to see details

3. **Shopping**

   - Click "Add to Cart" to add products
   - Adjust quantity as needed
   - Click "View Cart" to review your order
   - Click "Checkout" to place an order

4. **View Orders**
   - Click "Order History" to see your past orders
   - View order details, status, and totals

### For Sellers

1. **Sign Up**

   - Click "Sign up" on the login page
   - Enter your details and select "Seller" as account type
   - Click "Create Account"

2. **Upload Products**

   - Fill in product details (name, price, description, category)
   - Select a product image from your computer
   - Click "Upload Product"

3. **Manage Products**
   - View all your uploaded products
   - Delete products as needed

## File Structure

```
shopping website/
├── index.html                 # Login page
├── signup.html               # Sign up page
├── home.html                 # Home/Dashboard page
├── shop.html                 # Shopping page
├── cart.html                 # Shopping cart
├── orders.html               # Order history
├── seller dashboard.html     # Seller dashboard
├── style.css                 # Main stylesheet
├── firebase-config.js        # Firebase configuration
├── script.js                 # Login/Auth logic
├── signup.js                 # Sign up logic
├── home.js                   # Home page logic
├── shop.js                   # Shop functionality
├── cart.js                   # Cart functionality
├── orders.js                 # Orders display
└── seller-dashboard.js       # Seller dashboard logic
```

## Firebase Configuration

The project uses Firebase for:

- **Authentication**: User login and registration
- **Database**: Storing products, orders, and user data
- **Storage**: Uploading and serving product images

Firebase is already configured in the `firebase-config.js` file.

## Pages Overview

### Login Page (index.html)

- Email and password login
- Link to sign up page
- Redirects to appropriate dashboard based on role

### Sign Up Page (signup.html)

- User registration form
- Role selection (Buyer/Seller)
- Email verification via Firebase

### Home Page (home.html)

- Welcome message with user name
- Navigation to Shop, Cart, and Orders
- Logout functionality

### Shop Page (shop.html)

- Display all available products
- Search functionality
- Add products to cart
- Responsive product grid

### Cart Page (cart.html)

- View cart items with quantities
- Adjust item quantities
- Calculate totals with tax
- Proceed to checkout

### Orders Page (orders.html)

- View order history
- See order details and status
- Track order totals

### Seller Dashboard (seller dashboard.html)

- Upload new products with images
- View all your products
- Delete products
- Manage inventory

## Responsive Design

All pages are fully responsive and optimized for:

- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)

## Tips & Tricks

### Product Upload

- Supported image formats: JPG, PNG, GIF, WebP
- Max recommended image size: 5MB
- Images are automatically optimized

### Search

- Use the search bar on the shop page
- Search works by product name, description, and category

### Cart Management

- Cart data is stored locally in your browser
- Clear browser cache to reset cart

### Security

- Passwords are securely handled by Firebase Authentication
- User data is encrypted in transit and at rest

## Troubleshooting

### Images not loading

- Check your internet connection
- Verify Firebase Storage is properly configured
- Check browser console for errors

### Can't upload products

- Ensure you're logged in as a seller
- Check that image file is selected
- Verify all required fields are filled

### Orders not showing

- Refresh the page
- Check that you're logged in with the correct account
- Clear browser cache and try again

## Colors & Branding

- Primary Color: #a233d6 (Purple)
- Secondary Color: #fffafc (Light Pink)
- Accent Color: #28a745 (Green)
- Text: #333 (Dark Gray)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Future Enhancements

- Payment gateway integration
- Order tracking
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Admin panel

## Support

For issues or questions, please check:

1. Browser console for error messages
2. Firebase console for database issues
3. Internet connection

## License

This project is open for personal and educational use.

---

**Happy Shopping! 🛍️**
