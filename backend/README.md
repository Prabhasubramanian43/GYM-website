# FitFuel Backend

## Requirements

- Node.js 18+
- MongoDB Community running locally, or a MongoDB Atlas connection string

## Setup (Windows PowerShell)

1. Open terminal in the `backend` folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI`.
4. Run `npm run dev` (or `npm start`).
5. Check `http://localhost:5000/api/health`.

The existing frontend automatically syncs its original menu items to MongoDB when it loads. Existing food images and all CSS files remain in the frontend unchanged.

## API endpoints

- `GET /api/health`
- `GET /api/products?category=All&search=`
- `GET /api/products/:id`
- `POST /api/products/sync` (frontend menu sync)
- `GET /api/about`
- `GET /api/cart/:sessionId`, `PUT /api/cart/:sessionId`, `DELETE /api/cart/:sessionId`
- `POST /api/combos`, `GET /api/combos/:id`
- `POST /api/orders`, `GET /api/orders/:id-or-orderNumber`
- `POST /api/contact`

Orders are demo orders; no payment gateway is connected. Admin authentication and authorization should be added before exposing management endpoints publicly.
