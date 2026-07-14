# 🌱 PlanNet – Full-Stack Project Manual & Developer Documentation


## 1. Project Introduction & Purpose
PlanNet is a comprehensive web platform designed to bridge the gap between plant nurseries (Sellers) and home-gardening enthusiasts (Customers). 

### Problem Statement
Traditional plant nurseries often struggle with manual inventory management, order tracking, and reaching a wider consumer base. Customers, on the other hand, face challenges in finding specific plants, getting plant care guides, and conducting secure transactions online.

### Solution
PlanNet provides an elegant, single-page application (SPA) built with React and Express.js, featuring:
- A responsive, dynamic eCommerce store for plants.
- Secure credit/debit card transactions using the Stripe gateway.
- A multi-role dashboard system (Admin, Seller, Customer) to manage activities.
- Auto-applied coupons, real-time plant care guides, and user reviews.

---

## 2. Technical Architecture & Tech Stack

PlanNet follows a modern client-server architecture with secure API communication using Firebase ID tokens as JWTs.

```text
+------------------+       HTTPS + JWT       +-------------------+
|  React Client    | <=====================> | Express.js Server |
|  (Vite + Tailwind|                         | (Node.js API)     |
+------------------+                         +-------------------+
         ^                                             ^
         | Firebase SDK                                | MongoDB Driver
         v                                             v
+------------------+                         +-------------------+
|  Firebase Auth   |                         |  MongoDB Atlas    |
|  (Google/Email)  |                         |  (Database)       |
+------------------+                         +-------------------+
```

### Technology Stack Details:
- **Frontend Layer:** React 18 (Vite build tool), Tailwind CSS with DaisyUI component framework, React Router for client routing, and Axios for API requests.
- **State Management & Data Fetching:** TanStack Query (React Query) for server state caching and automatic refetching.
- **Backend API Layer:** Node.js runtime and Express.js framework, utilizing CORS and JSON middleware.
- **Database Layer:** MongoDB Atlas (NoSQL cloud database) storing JSON-like documents.
- **Payment Infrastructure:** Stripe API processing card payments and issuing checkout sessions.
- **Media Storage:** ImgBB API for hosting user avatars, cover photos, and plant images.

---

## 3. Directory Structure & Key Files

Understanding the project codebase structure:

```text
plant-net/
├── backend/                  # Node/Express API Server
│   ├── index.js              # Server entry point, middlewares, and API routes
│   ├── package.json          # Node dependencies (express, cors, stripe, firebase-admin, mongodb)
│   ├── vercel.json           # Server routing configuration for Vercel Serverless Functions
│   └── serviceKeyConverter.json # Firebase Admin SDK service account key
│
└── frontend/                 # React SPA Client
    ├── public/               # Static assets (favicons, manifest files)
    ├── src/
    │   ├── firebase/         # Firebase initialization setup (firebase.config.js)
    │   ├── hooks/            # Custom React hooks (useAuth, useAxiosSecure, useRole, useCart)
    │   ├── layouts/          # Application layouts (MainLayout.jsx, DashboardLayout.jsx)
    │   ├── pages/            # Core views (Home, Shop, PlantDetails, Cart, Admin/Seller/Customer Dashboards)
    │   ├── providers/        # Context Providers (AuthProvider.jsx, CartProvider.jsx, ThemeProvider.jsx)
    │   ├── routes/           # Routing configuration & route protection (PrivateRoute, AdminRoute)
    │   ├── utils/            # Shared utility functions
    │   ├── index.css         # Tailwind directives and custom global CSS
    │   └── main.jsx          # React app mount script
    ├── package.json          # Client dependencies (react, react-router, tailwindcss, daisyui, stripe)
    └── vite.config.js        # Vite bundler options
```

---

## 4. Comprehensive User Roles & Feature Flows

PlanNet utilizes a Role-Based Access Control (RBAC) system. When a user logs in, their email is queried in the database to fetch their assigned role.

### A. Customer Workflow
1. **Browsing & Searching:** Customers browse plants on the Home and Shop pages. They can search by plant name, filter by category (e.g., Indoor, Outdoor, Succulents), and sort by price.
2. **Wishlist Management:** A customer can click the floating heart button on any plant card to save it to their MongoDB-backed wishlist dashboard for later purchase.
3. **Cart & Coupons:** Customers add desired plants to their cart, modify quantities, and enter coupon codes. The app calls the `/coupons/apply` API to validate the discount.
4. **Stripe Checkout:** During checkout, the client initiates a Stripe payment session. Upon successful card authorization, the customer is redirected to `/payment-success` where the inventory is adjusted.
5. **Order Tracking & Reviews:** Customers view their purchase history. They can track the step-by-step progress bar (Ordered ➔ In Progress ➔ Delivered) and submit star ratings and reviews for delivered plants.

### B. Seller Workflow
1. **Nursery Inventory:** Sellers add plants by filling out forms with images (uploaded to ImgBB), category, price, and initial stock. They can edit or delete items at any time.
2. **Order Management:** Sellers receive a list of orders containing their specific plants. They are responsible for transitioning order status from `Pending` to `In Progress` to `Delivered`.
3. **Verification:** Sellers who sign up are in a pending state until an Admin verifies their seller profile.

### C. Admin Workflow
1. **User Moderation:** Admins view all system users, change roles, approve pending seller verification requests, and delete accounts.
2. **Promo Management:** Admins create new percentage-based or fixed-value coupons, specify validity, and delete active codes.
3. **Analytics Dashboard:** Admins view system-wide stats like Total Revenue, Total Orders, Active Users, and visualize sales performance via interactive charts.

---

## 5. Database Schema & Collections Design

Here is how data is modeled in MongoDB:

### 1. `users` Collection
Stores user profiles, roles, and cover banner positioning coordinates.
```json
{
  "_id": "ObjectId",
  "name": "Fardin Rahman Sojon",
  "email": "customer@example.com",
  "image": "https://imgbb.com/avatar.png",
  "role": "customer",
  "status": null,
  "address": "Dhaka, Bangladesh",
  "phone": "017XXXXXXXX",
  "coverImage": "https://imgbb.com/cover.png",
  "coverPosition": 45,
  "timestamp": 1720894000000
}
```

### 2. `plants` Collection
Stores nursery inventory information.
```json
{
  "_id": "ObjectId",
  "name": "Aloe Vera",
  "category": "Succulents",
  "price": 12.50,
  "quantity": 25,
  "description": "Easy to care medicinal plant.",
  "image": "https://imgbb.com/aloe.png",
  "seller": {
    "name": "Greenhouse Nursery",
    "email": "seller@example.com",
    "image": "https://imgbb.com/seller-avatar.png"
  }
}
```

### 3. `orders` Collection
Maintains customer order logs and tracking status.
```json
{
  "_id": "ObjectId",
  "plantId": "ObjectId(plants._id)",
  "transactionId": "pi_3Pxxxxxxxxxxxxx",
  "customer": "customer@example.com",
  "customerName": "Fardin Rahman Sojon",
  "status": "Pending",
  "seller": "seller@example.com",
  "name": "Aloe Vera",
  "category": "Succulents",
  "quantity": 2,
  "price": 10.00,
  "image": "https://imgbb.com/aloe.png",
  "address": "Dhaka, Bangladesh",
  "phone": "017XXXXXXXX",
  "createdAt": "ISODate",
  "timestamp": 1720894200000
}
```

---

## 6. API Endpoint Specifications

All endpoints under the `/` prefix. Protected routes require a valid Authorization header.

### Public Routes (No Authentication Needed)
- `GET /plants` - Fetch all plants.
- `GET /plants/:id` - Fetch details of a single plant by its ID.
- `POST /users/:email` - Inserts user data on sign up (sets role to 'customer' by default).
- `POST /contact-messages` - Saves visitor inquiries from the contact form.
- `GET /reviews/:plantId` - Fetches customer reviews for a specific plant.
- `POST /coupons/apply` - Computes discount totals given a coupon code.

### Secure Routes (JWT / Firebase ID Token Required)

#### Customer Actions:
- `POST /create-checkout-session` - Generates a Stripe Session URL for checkout and registers a temporary Pending order.
- `POST /payment-success` - Processes Stripe success redirect, updates transaction details, and decrements stock.
- `GET /my-orders/:email` - Gets order tracking list.
- `DELETE /orders/:id` - Cancels an order. (Forbidden if order status is already 'In Progress' or 'Delivered').
- `POST /wishlist` - Adds a plant item to the wishlist collection.
- `GET /wishlist/:email` - Retrieves a user's wishlisted items.
- `DELETE /wishlist/:id` - Removes an item from the wishlist.

#### Seller Actions:
- `POST /plants` - Adds a new plant to the inventory.
- `GET /my-inventory/:email` - Returns the seller's catalog (Admins see all records).
- `PATCH /plants/:id` - Updates details (price, stock, description) of a plant.
- `DELETE /plants/:id` - Deletes a plant item from inventory.
- `GET /manage-orders/:email` - Returns orders containing the seller's plants.
- `PATCH /orders/status/:id` - Updates delivery status (`Pending` ➔ `In Progress` ➔ `Delivered`).

#### Admin Actions:
- `GET /users` - Lists all registered users.
- `PATCH /users/update/:email` - Updates role or approves seller verification requests.
- `DELETE /users/:id` - Deletes a user profile.
- `GET /admin-orders` - Returns all orders across the platform.
- `GET /admin-stat` - Computes system stats and revenues.
- `GET /contact-messages` - Fetches client support queries.
- `POST /coupons` - Creates new discount coupon.
- `GET /coupons` - Lists all active coupons.
- `DELETE /coupons/:id` - Deletes/invalidates a coupon.

---

## 7. Frontend Security & JWT Implementation

PlanNet uses a highly secure dynamic JWT token model. Instead of saving tokens in `localStorage` or `sessionStorage` (which are vulnerable to XSS attacks), the frontend requests a fresh ID token directly from Firebase Auth on every API request.

### `useAxiosSecure` Interceptor Workflow
The custom React Hook `useAxiosSecure` configures an Axios instance with request and response interceptors:

1. **Request Interceptor:**
   Before any HTTP request is dispatched to the backend, the interceptor fetches the current user from Firebase:
   ```javascript
   const token = await currentUser.getIdToken();
   config.headers.Authorization = `Bearer ${token}`;
   ```
   This ensures the token is always valid and fresh.

2. **Response Interceptor:**
   If the backend returns a `401 Unauthorized` or `403 Forbidden` status code, it indicates the token has expired, is invalid, or the user lacks role permission. The interceptor triggers:
   ```javascript
   await logOut();
   navigate('/login');
   ```
   This immediately signs out the user and secures the route.

---

## 8. Local Setup & Configuration

### Prerequisites
- Node.js installed (LTS Version recommended).
- A MongoDB Atlas cluster.
- A Firebase Project with Email/Password and Google Sign-in enabled.
- A Stripe account in test mode.

### Installation Steps

1. **Clone the repositories:**
   ```bash
   git clone <repo-url>
   cd b12-m11-session-starter
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/plantsDB
   STRIPE_SECRET=sk_test_your_secret_stripe_key
   DOMAIN_URL=http://localhost:5173
   FB_SERVICE_KEY=your_firebase_admin_sdk_json_in_base64
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `frontend/.env.local` file:
   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_API_URL=http://localhost:5000
   VITE_IMGBB_API=your_imgbb_client_api_key
   VITE_STRIPE_PK=pk_test_your_stripe_publishable_key
   ```

4. **Running the Application:**
   Open two separate terminals and start both services:
   ```bash
   # Terminal 1 (Backend)
   cd backend && npm run dev

   # Terminal 2 (Frontend)
   cd frontend && npm run dev
   ```

---

## 9. Common Troubleshooting Guide

### 1. CORS Policy Errors
- **Symptom:** API calls fail with CORS block errors.
- **Fix:** In `backend/index.js`, ensure the `cors` middleware origins include `http://localhost:5173`. If you deployed the client on Vercel or Firebase hosting, add those production domains to the CORS origins array.

### 2. Firebase JWT Verification Failure
- **Symptom:** API requests return `401 Unauthorized`.
- **Fix:** Verify that `FB_SERVICE_KEY` in the backend environment is a valid Base64 string of the Firebase Service Account JSON. Ensure you haven't copy-pasted a malformed string.

### 3. Stripe Checkout Fails to Load
- **Symptom:** Direct checkout button shows error.
- **Fix:** Make sure both `STRIPE_SECRET` in the server and `VITE_STRIPE_PK` in the client belong to the same Stripe account (Test Mode).

---

## 10. Deployment Instructions

### Backend (Vercel Deploy)
1. Ensure the `backend/vercel.json` exists with the correct rewrite paths.
2. In the Vercel Dashboard, import the `backend` repository.
3. Configure the environment variables in Vercel Project Settings.
4. Deploy the backend and copy the production URL (e.g., `https://plant-net-api.vercel.app`).

### Frontend (Vercel/Netlify Deploy)
1. Import the `frontend` repository.
2. Change the Build command to `npm run build` and output directory to `dist`.
3. Set the client environment variables in the project settings, making sure `VITE_API_URL` is set to your live Backend URL.
4. Deploy the frontend client.
