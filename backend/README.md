# ShopStream Backend API

E-commerce analytics dashboard backend built with Hono + TypeScript + MongoDB.

## Quick Start

The database is already set up in the cloud. Just connect and run!

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Start server
npm run dev
```

**Login credentials:** `admin` / `admin123`

---

## Technologies

- **Framework:** Hono (Node.js)
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Testing:** Vitest

## Folder Structure

```
src/
├── config/         # Database connection
├── controllers/    # Request handlers
├── middlewares/    # Auth & logging middleware
├── models/         # Mongoose schemas (User, Product, Order)
├── routes/         # API route definitions
├── services/       # Business logic
└── utils/          # JWT, hashing, logger
```

## Authentication Flow

1. Client sends `POST /auth/login` with `{ username, password }`
2. Server validates credentials against MongoDB
3. Server returns JWT token (expires in 1 hour)
4. Client includes `Authorization: Bearer <token>` in subsequent requests
5. Protected routes verify token via `authMiddleware`

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Database connection status |
| POST | `/auth/login` | Login, returns JWT |

### Protected (require Bearer token)

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| GET | `/analytics/metrics` | - | Total revenue, orders, avg order value, products |
| GET | `/analytics/revenue-trend` | - | Daily revenue for last 7 days |
| GET | `/analytics/order-status` | - | Order count by status |
| GET | `/orders` | `status?` | List orders (filter: Processed, In Delivery, Delivered) |
| GET | `/products` | - | List all products (sorted A-Z) |

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `MONGO_DB_NAME` | Database name | `shopstream` |
| `JWT_SECRET` | Secret for JWT signing | `your-secret-key` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm test` | Run unit tests |

## Testing

```bash
npm test
```

9 unit tests covering:
- Auth service (login success/failure)
- Analytics service (metrics, order status)
- Orders service (filtering, edge cases)

## Default Credentials

- **Username:** `admin`
- **Password:** `admin123`
