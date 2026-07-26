# Shopora — Multi-Route E-Commerce Frontend

A fully featured, client-side e-commerce SPA built with **React**, **React Router DOM v6**, and the **Context API**. Consumes the [DummyJSON](https://dummyjson.com/products) REST API for live product data.

**🌐 Live Demo:** [https://prodesk-2q6u-teal.vercel.app/](https://prodesk-2q6u-teal.vercel.app/)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Vite) |
| Routing | React Router DOM v6 |
| Global State | Context API + useReducer |
| Persistence | localStorage |
| Styling | Vanilla CSS (custom design system) |
| Data Source | https://dummyjson.com/products |

---

## Features

### Phase 1 — Routing
- `BrowserRouter` with 7 client-side routes (no page reloads)
- Dynamic route `/product/:id` using `useParams()` to fetch and render individual products
- `useNavigate()` on product cards for programmatic navigation

### Phase 2 — Global State
- `CartContext` using `useReducer` with ADD / REMOVE / UPDATE_QUANTITY / CLEAR_CART actions
- `AuthContext` with guest login toggle
- Navbar cart icon badge re-renders reactively on every state change
- `/cart` route maps items, handles quantity controls, and calculates aggregate total
- Free shipping applied automatically on orders over $50

### Phase 3 — Auth & Route Protection
- `ProtectedRoute` wrapper guards `/checkout` and redirects unauthenticated users to `/login`
- "Continue as Guest" sets `isAuthenticated = true` and returns user to their intended route
- Cart and auth state persist across hard browser refreshes via `localStorage`

### Extras
- Real-time search and sort toolbar on the Shop page
- Skeleton loading UI while API data fetches
- Sticky image gallery with thumbnail switcher on the product detail page
- Breadcrumb navigation on product pages
- Contact form with controlled inputs and a success confirmation state
- Checkout includes tax (8%) and conditional free shipping calculation

---

## Project Structure

```
src/
├── context/
│   ├── CartContext.jsx        # Cart state + localStorage sync
│   └── AuthContext.jsx        # Auth mock state + persistence
├── components/
│   ├── Navbar.jsx             # Persistent nav with dynamic cart badge
│   ├── ProductCard.jsx        # Reusable shop grid card
│   ├── ProtectedRoute.jsx     # Route guard component
│   └── Footer.jsx             # Site footer
├── pages/
│   ├── Home.jsx               # / — Hero, categories, CTA
│   ├── Shop.jsx               # /shop — Product grid with search & sort
│   ├── ProductDetail.jsx      # /product/:id — Detail view
│   ├── Cart.jsx               # /cart — Cart summary and totals
│   ├── Contact.jsx            # /contact — Functional contact form
│   ├── Login.jsx              # /login — Guest login
│   └── Checkout.jsx           # /checkout — Protected checkout
├── styles/
│   └── index.css              # Global design system (tokens, resets, utilities)
├── App.jsx                    # BrowserRouter + route definitions
└── main.jsx                   # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

---

## Routes

| Path | Page | Protected |
|---|---|---|
| `/` | Home | No |
| `/shop` | Product Grid | No |
| `/product/:id` | Product Detail | No |
| `/cart` | Shopping Cart | No |
| `/contact` | Contact Form | No |
| `/login` | Guest Login | No |
| `/checkout` | Checkout | **Yes** — redirects to `/login` |

---

## State Architecture

### CartContext
Manages the global cart state using `useReducer`. Exposes:
- `cart` — array of cart items (with `quantity`)
- `addItem(product)` — adds item or increments quantity if already in cart
- `removeItem(id)` — removes item from cart
- `updateQuantity(id, quantity)` — sets quantity; removes if `<= 0`
- `clearCart()` — empties the cart
- `totalItems` — derived count for the navbar badge
- `totalPrice` — derived aggregate price

### AuthContext
Manages mock authentication state. Exposes:
- `isAuthenticated` — boolean flag
- `user` — `{ name, email }` object
- `loginAsGuest()` — sets auth to true with a guest user object
- `logout()` — clears auth state

Both contexts write to `localStorage` on every state change and rehydrate on app load.
