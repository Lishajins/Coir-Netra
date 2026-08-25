# Coir Netra

A digital marketplace for Kerala's coir industry, built for Alappuzha, the coir capital of the world. Coir Netra connects everyone in the coir supply chain (coconut farmers, husk suppliers, fibre processors, artisans, and finished goods sellers) on a single platform.

## Current status

- The React frontend in `website/` implements the welcome page, marketplace hub, category browsing, product listing and detail pages, seller authentication, and a seller dashboard. Page data currently comes from `website/src/data/mockData.js`.
- The Express backend in `server/` exposes a health check at `GET /api/health` and an AI chat endpoint at `POST /api/ai/chat`.
- Product documents (PRD, app flow, tech stack, frontend guidelines, backend schema, AI implementation plan) live in `imp_docs/`.

## Features

- Marketplace across three stages: raw materials, intermediate products, and final goods
- Search and filters by name, category, subcategory, district, price, and quantity (frontend)
- Seller dashboard screens for product management (frontend)
- CoirBot AI assistant endpoint backed by Google Generative AI
- Responsive mobile first layout

## Tech stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React 19 + Vite |
| Routing | React Router DOM v7 |
| Client state | Zustand (auth, search, filter stores) |
| Server state | TanStack React Query |
| Styling | CSS modules and plain CSS |
| Backend | Node.js + Express |
| Database | PostgreSQL via Prisma ORM |
| AI | @google/generative-ai |
| Notifications | react-hot-toast |
| Icons | lucide-react |

## Repository structure

```
coir-netra/
├── website/                  # React frontend
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   └── ui/
│       ├── pages/            # Welcome, Marketplace, Category, Products,
│       │                     # ProductDetail, Auth, SellerDashboard
│       ├── store/store.js    # useAuthStore, useSearchStore, useFilterStore
│       ├── data/mockData.js  # Sample catalogue data
│       └── App.jsx           # Root component and routes
├── server/                   # Node.js + Express backend
│   ├── index.js              # App entry, mounts /api/ai and /api/health
│   ├── routes/ai.js          # POST /api/ai/chat
│   └── prisma/
│       ├── schema.prisma     # users and products models
│       └── seed.js           # Sample data seeder
├── imp_docs/                 # Product and design documents (.docx)
└── README.md
```

## Getting started

Prerequisites: Node.js 18+ and a PostgreSQL database (a free Supabase project works).

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/coirnetra"
ANTIGRAVITY_API_KEY="your-google-gemini-key"
GOOGLE_MAPS_API_KEY="your-google-maps-key"
PORT=3000
```

Run migrations and start the server:

```bash
npx prisma migrate dev --name init
npx prisma db seed    # Optional: seed with sample data
npm run dev           # Nodemon, listens on PORT or 3000
```

Verify with `GET /api/health`, which returns a status message.

### 2. Frontend

```bash
cd website
npm install
npm run dev           # Dev server at http://localhost:5173
```

### Scripts

Backend (`server/`):

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start dev server with nodemon |
| `node index.js` | Run without nodemon |
| `npx prisma migrate dev` | Run new migrations |
| `npx prisma studio` | Open the Prisma database GUI |
| `npx prisma db seed` | Seed sample data |

Frontend (`website/`):

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |

## Database models

`server/prisma/schema.prisma` defines two models:

- `users`: seller accounts
- `products`: listings linked to a seller

`seed.js` inserts sample rows so the frontend has something to show.

## AI chat endpoint

`POST /api/ai/chat` takes `{ "userMessage": "..." }` and returns the assistant reply. The API key stays on the server; the frontend never sees it.

## Deployment

Typical split:

- Frontend on Vercel: `cd website && npm run build`, then deploy `dist/`.
- Backend on Railway or any Node host: push the `server/` directory and set the environment variables from the template above.

## Roadmap

- [x] Seller registration and dashboard screens
- [x] Product listing with three tier categories
- [x] Search and advanced filters (mock data)
- [x] AI chatbot endpoint (CoirBot)
- [ ] Wire frontend pages to live backend endpoints
- [ ] Price trend insights and demand analytics
- [ ] UPI payment integration
- [ ] Buyer accounts and wishlist
- [ ] WhatsApp Business API integration
- [ ] Malayalam language support
- [ ] Verified seller badges
- [ ] React Native mobile app

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT license.

---

Built for Kerala's coir ecosystem. "Connecting the roots of Kerala's coir industry to the world."
