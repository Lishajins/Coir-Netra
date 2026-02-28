# 🌿 Coir Netra

> **The Unified Digital Marketplace for Kerala's Coir Industry**

Coir Netra connects every stakeholder in the coir supply chain — from coconut farmers and husk suppliers to fibre processors, artisans, and finished-goods sellers — within a single intelligent platform. Built for Alappuzha, the Coir Capital of the World.

---

## ✨ Features

- **🏪 Full Supply Chain Marketplace** — Browse and list products across all three stages: Raw Materials → Intermediate Products → Final Goods
- **🔍 Intelligent Search & Filters** — Search by product name, category, subcategory, or seller. Filter by Kerala district, price range, and quantity
- **🤖 CoirBot AI Assistant** — Chatbot that answers sourcing questions and provides market guidance on every page
- **📈 Price Trend Insights** — AI-generated analysis of regional price averages shown on every product detail page
- **📊 Demand Analytics** — Sellers get AI-powered insights into trending products and buyer activity in their dashboard
- **🛠️ Seller Dashboard** — Complete product management with stock toggles, image uploads, and profile management
- **📱 Fully Responsive** — Mobile-first design optimised for use across all screen sizes

---

## 🖥️ Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Welcome | `/` | Hero slideshow, industry intro, CTAs |
| Marketplace Hub | `/marketplace` | Category cards + subcategory carousel |
| Product Listing | `/products` | Filterable product grid |
| Product Detail | `/product/:id` | Full product info + AI price insight |
| Seller Auth | `/auth` | Sign up / Login (split-screen) |
| Seller Dashboard | `/seller/dashboard` | Manage products, AI analytics, profile |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS + CSS Variables / Tailwind CSS |
| State Management | Zustand |
| Server State | React Query (TanStack) |
| Routing | React Router DOM v6 |
| Backend | Node.js + Express.js |
| Database | PostgreSQL (via Supabase) |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| Image Storage | Cloudinary |
| Frontend Deploy | Vercel |
| Backend Deploy | Railway |

---

## 🗂️ Project Structure

```
coir-netra/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar/
│   │   │   ├── ProductCard/
│   │   │   ├── ChatBot/        # CoirBot widget (global)
│   │   │   ├── CategoryCard/
│   │   │   └── ProtectedRoute/
│   │   ├── pages/              # Route-level page components
│   │   │   ├── WelcomePage/
│   │   │   ├── MarketplacePage/
│   │   │   ├── ProductsPage/
│   │   │   ├── ProductDetailPage/
│   │   │   ├── AuthPage/
│   │   │   └── SellerDashboard/
│   │   ├── store/              # Zustand stores
│   │   │   └── store.js        # useAuthStore, useSearchStore, useFilterStore
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Root component + routing
│   │   └── index.css           # Global CSS variables & base styles
│   └── vite.config.js
│
├── server/                     # Node.js + Express backend
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── seller.js
│   │   ├── search.js
│   │   ├── ai.js               # Antigravity proxy
│   │   └── upload.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── rateLimiter.js
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── index.js                # Express app entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or pnpm
- PostgreSQL database (or a free [Supabase](https://supabase.com) project)
- [Cloudinary](https://cloudinary.com) account (free tier)
- [Antigravity](https://antigravity.ai) API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/coir-netra.git
cd coir-netra
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory:

```env
DATABASE_URL="postgresql://user:password@host:5432/coirnetra"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
ANTIGRAVITY_API_KEY="your-antigravity-key"
CLIENT_URL="http://localhost:5173"
PORT=3000
```

Run database migrations:

```bash
npx prisma migrate dev --name init
npx prisma db seed         # Optional: seed with sample categories & products
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `/client` directory:

```env
VITE_API_URL="http://localhost:3000"
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🗃️ Database Schema

```
users           → Seller accounts (email, password_hash, name, contact, location)
categories      → 3 main categories
subcategories   → 18 subcategories linked to categories
products        → All listings (linked to seller + subcategory)
analytics_events→ Page views, searches, filter interactions
rfq_leads       → Buyer inquiry messages to sellers
```

---

## 🤖 AI Features (Antigravity)

All AI calls are proxied through the backend — the Antigravity API key is never exposed to the frontend.

| Feature | Endpoint | Cache |
|---------|----------|-------|
| CoirBot chatbot | `POST /api/ai/chat` | None (real-time) |
| Price trend insight | `GET /api/ai/price-trends?subcategory=:id` | 6 hours |
| Demand analytics | `GET /api/ai/demand-insights?sellerId=:id` | 24 hours |

---

## 📦 Product Categories

<details>
<summary><b>Primary Raw Materials</b></summary>

- Coconut Husk
- Brown Coir Fibre
- White Coir Fibre
- Coir Pith / Coco Peat
</details>

<details>
<summary><b>Intermediate Materials</b></summary>

- Coco Peat Blocks / Briquettes / Bricks
- Coir Chips / Husk Chips
- Coir Yarn
- Coir Rope
</details>

<details>
<summary><b>Final Goods</b></summary>

- Mats & Matting
- Mattresses & Upholstery
- Geo-Textiles
- Horticulture & Gardening Products (Grow Bags, Pots, Substrates)
- Household & Utility Items (Doormats, Brushes, Baskets, Nets)
- Organic Soil Amendments
- Coconut Shell Charcoal
- Activated Carbon
- Shell Powder
</details>

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
cd client
npm run build
# Deploy /dist to Vercel or push to GitHub for auto-deploy
```

Set environment variable on Vercel:
```
VITE_API_URL=https://your-railway-backend.up.railway.app
```

### Backend (Railway)

Push the `/server` directory to a Railway project. Set all environment variables from the `.env` template above in the Railway dashboard.

---

## 🔒 Environment Variables Reference

| Variable | Where | Description |
|----------|-------|-------------|
| `DATABASE_URL` | Server | PostgreSQL connection string |
| `JWT_SECRET` | Server | Secret key for signing JWTs |
| `CLOUDINARY_CLOUD_NAME` | Server | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Server | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Server | Cloudinary API secret |
| `ANTIGRAVITY_API_KEY` | Server | Antigravity platform key |
| `CLIENT_URL` | Server | Frontend URL for CORS config |
| `PORT` | Server | Backend port (default: 3000) |
| `VITE_API_URL` | Client | Backend API base URL |

---

## 📋 Available Scripts

### Backend (`/server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with nodemon |
| `npm start` | Start production server |
| `npx prisma migrate dev` | Run new migrations |
| `npx prisma studio` | Open Prisma DB GUI |
| `npx prisma db seed` | Seed sample data |

### Frontend (`/client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🗺️ Roadmap

- [x] Seller registration & dashboard
- [x] Product listing with 3-tier categories
- [x] Search & advanced filters
- [x] AI chatbot (CoirBot)
- [x] Price trend insights
- [x] Demand analytics for sellers
- [ ] UPI payment integration
- [ ] Buyer accounts & wishlist
- [ ] WhatsApp Business API integration
- [ ] Malayalam language support
- [ ] Verified Seller badges
- [ ] React Native mobile app

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with 🌿 for Kerala's Coir Ecosystem</p>
  <p><i>"Connecting the roots of Kerala's coir industry to the world."</i></p>
</div>
