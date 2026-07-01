# 🌱 PlanNet – A Plant Nursery Management System

## 🎯 Project Purpose
PlanNet is a comprehensive full-stack web application designed to bridge the gap between plant sellers and nature enthusiasts.  
It provides a platform where sellers can manage their nursery inventory seamlessly, and customers can explore, purchase, and bring home lush greenery with ease.  
The platform emphasizes a clean user experience, secure transactions, role-based dashboards, and efficient management tools for all parties.

---

## 🌐 Live Applications

| Service | URL |
|---------|-----|
| 🖥️ **Frontend (Vercel)** | [https://plant-net-client-eta.vercel.app](https://plant-net-client-eta.vercel.app) |
| ⚙️ **Backend API (Vercel)** | [https://plant-net-server-six.vercel.app](https://plant-net-server-six.vercel.app) |

---

## 🗝 Key Features

✅ **Robust User Authentication**
- Secure Login, Signup, and Google Sign-in powered by **Firebase**.
- **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Admins**, **Sellers**, and **Customers**.
- Secured Private Routes to protect sensitive pages.
- JWT token-based API security using Firebase ID tokens via interceptors.

✅ **Dashboard & Management (Private Routes)**
- **Seller Dashboard:** Add new plants with image previews, update plant details, delete inventory, and track sales.
- **Customer Dashboard:** View order history, manage cart, track purchases, and save plants to Wishlist.
- **Admin Dashboard:** Oversee all users, manage roles, verify seller accounts, and manage promo coupons.

✅ **Plant Discovery & Ordering**
- **Home Page:** Showcase of available plants with attractive cards displaying price, category, and quantity.
- **Plant Details:** In-depth view of plant information with a **Plant Care Guide** (water, light, soil recommendations).
- **Shop Page:** Advanced search, category filtering, and multi-criteria sorting controls.
- **Cart & Checkout:** Seamless ordering process with coupon code discount support.

✅ **Secure Payments**
- Integrated **Stripe** payment gateway for safe and reliable transactions.
- Coupon/promo code support with percentage and fixed discount calculations applied to Stripe sessions.
- Order status updates upon successful payment.

✅ **Responsive Design & Modern UI**
- Fully responsive layout optimized for mobile, tablet, and desktop.
- Built with **Tailwind CSS** and **DaisyUI** for a modern, clean aesthetic.
- Dark mode support across all pages and dashboard components.
- Interactive elements like Image Previews, Animated Modals, Order Progress Trackers, and Toast Notifications.

✅ **Rich Profile Management**
- Custom cover photo upload with an interactive **vertical repositioning slider**.
- Profile avatar, name, role badge, and registration date displayed in a premium card layout.
- Auto-prefill shipping name, address, and phone number from the saved user profile.

✅ **Reviews & Ratings**
- Customers can submit star ratings and written reviews directly on plant detail pages.
- All reviews are persisted in MongoDB and displayed below the plant description.

✅ **Wishlist**
- Users can save any plant to their personal wishlist using the ❤️ button on detail pages.
- Dedicated Wishlist dashboard page with one-click "Add to Cart" from saved items.

✅ **Order Tracking**
- Visual step-by-step order progress bar (Ordered → In Progress → Delivered).
- Updates in real-time based on order status from the seller/admin.

✅ **Analytics Dashboard**
- Admin statistics page with an animated **Recharts AreaChart** showing platform-wide sales and order trends.

---

## 👥 User Roles

### 👑 Admin
- **Manage Users:** View all registered users with live search, role/status filters, and summary metric cards.
- **Verify Accounts:** One-click Approve button to verify unverified Sellers and Admins.
- **Role Management:** Promote or demote users via a custom role update modal.
- **Manage Coupons:** Create, activate, and delete promo codes with percentage or fixed discount types.
- **Safe Deletion:** Custom confirmation modal displays the target account email before deleting.

### 🏪 Seller
- **Inventory Management:** Add new plants with images, update details, and remove items.
- **Sales Tracking:** Monitor plant sales and inventory levels.
- **Seller Verification:** Request verification via the profile dashboard.

### 🛒 Customer
- **Shopping Experience:** Browse plants, filter by category, sort by price/name, and add to cart.
- **Secure Checkout:** Purchase plants securely using Stripe with optional coupon discounts.
- **Wishlist:** Save favourite plants and add them to cart with a single click.
- **Order History:** View past orders with live tracking progress bars.

---

## 📦 NPM Packages Used

| Package | Purpose |
|---------|---------|
| react | Core React library |
| react-router-dom | Routing & Navigation |
| firebase | Authentication & Token Management |
| @tanstack/react-query | Efficient Data Fetching & Caching |
| axios | HTTP Client with JWT interceptors |
| react-hook-form | Form handling & Validation |
| @stripe/stripe-js / @stripe/react-stripe-js | Payment Processing |
| tailwindcss | Styling framework |
| daisyui | UI Component library |
| recharts | Interactive Analytics Charts |
| @headlessui/react | Accessible Modal & Dialog Components |
| react-hot-toast | Toast Notifications |
| react-icons | Modern Icons |
| imgbb-uploader (via API) | Cloud Image Hosting |

---

## 🧩 Tools & Technologies

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | TailwindCSS + DaisyUI |
| **Authentication** | Firebase Authentication |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Atlas) |
| **Payment** | Stripe API |
| **State Management** | TanStack Query + Context API |
| **Deployment (Frontend)** | Vercel |
| **Deployment (Backend)** | Vercel |

---

## ⚙️ Run Locally

```bash
# 1. Clone both repositories
git clone https://github.com/fardin-sojon/plant-net-server.git
git clone https://github.com/fardin-sojon/plant-net-client.git

# 2. Navigate to backend & install dependencies
cd plant-net-server
npm install

# Create .env file and add:
# DB_USER=your_mongo_user
# DB_PASS=your_mongo_password
# STRIPE_SECRET_KEY=your_stripe_secret
# ACCESS_TOKEN_SECRET=your_jwt_secret

npm start

# 3. Navigate to frontend & install dependencies
cd ../plant-net-client
npm install

# Create .env.local file and add:
# VITE_APIKEY=your_firebase_api_key
# VITE_AUTHDOMAIN=...
# VITE_PROJECTID=...
# VITE_STORAGEBUCKET=...
# VITE_MESSAGINGSENDERID=...
# VITE_APPID=...
# VITE_API_URL=http://localhost:5000

npm run dev
```

---

## 📁 Repository Links

- 🖥️ **Frontend:** [github.com/fardin-sojon/plant-net-client](https://github.com/fardin-sojon/plant-net-client)
- ⚙️ **Backend:** [github.com/fardin-sojon/plant-net-server](https://github.com/fardin-sojon/plant-net-server)

---

*Built with ❤️ by Fardin Rahman Sojon*
