# Café Monteverde

**A specialty coffee e-commerce platform for exclusive Costa Rican coffee**

Café Monteverde is a modern web application for selling specialty and exclusive coffee to discerning consumers. The platform supports product catalogs, shopping cart, orders, and subscriptions.

## 🎯 Features

### Customer Features
- **Product Catalog** - Browse specialty coffee varieties with detailed information
- **Shopping Cart** - Add products, manage quantities, and calculate totals
- **User Authentication** - Secure signup and login with Supabase Auth
- **Order Management** - Place and track orders
- **Subscriptions** - Set up recurring coffee deliveries (Coming Soon)
- **User Dashboard** - View order history and manage account (Coming Soon)

### Admin Features (Coming Soon)
- Order management and fulfillment
- Inventory tracking
- Customer management
- Product management

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom coffee-inspired theme
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Supabase Client** for authentication and database
- **Stripe** for payments (Coming Soon)

### Backend
- **Supabase** for database, authentication, and storage
- **Express.js** minimal API server
- **Stripe** for payment processing (Coming Soon)

### Database
- PostgreSQL (via Supabase)
- Row Level Security (RLS) policies
- Optimized indexes for performance

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Stripe account (for payments - optional for now)

### Quick Start

1. **Clone and install dependencies:**
```bash
cd cafe-monteverde
npm run install:all
```

2. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL in `SUPABASE_SCHEMA.sql` in your Supabase SQL Editor
   - Optionally run `SAMPLE_DATA.sql` for sample products

3. **Configure environment variables:**
```bash
# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env and add your Supabase credentials

# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and add your credentials
```

4. **Start the development servers:**
```bash
npm run dev
```

The application will be running at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🎨 Design System

### Color Palette
- **Coffee tones** - Warm browns and beiges for primary elements
- **Green Mountain** - Fresh greens representing Costa Rican highlands
- **Glass morphism** - Modern semi-transparent UI elements

### Components
- Responsive design optimized for desktop and mobile
- Custom Tailwind classes for consistent styling
- Smooth animations with Framer Motion

## 📁 Project Structure

```
cafe-monteverde/
├── frontend/                   # React application
│   ├── src/
│   │   ├── shared/
│   │   │   ├── components/    # Reusable UI components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── ProductCard.tsx
│   │   │   ├── contexts/      # React contexts
│   │   │   │   ├── AuthContext.tsx
│   │   │   │   └── CartContext.tsx
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   │   └── useProducts.ts
│   │   │   ├── lib/           # External libraries
│   │   │   │   └── supabase.ts
│   │   │   ├── types/         # TypeScript types
│   │   │   │   └── index.ts
│   │   │   └── utils/         # Utility functions
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   └── LoginPage.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
├── backend/                    # Express API server
│   ├── src/
│   │   └── server.js
│   └── package.json
├── SUPABASE_SCHEMA.sql        # Database schema
├── SAMPLE_DATA.sql            # Sample product data
└── README.md
```

## 🚀 Deployment

### Frontend (Recommended: Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend
The backend is minimal - most functionality uses Supabase directly from the frontend.

## 📊 Database Schema

### Tables
- **profiles** - User profiles (extends Supabase auth.users)
- **addresses** - Shipping addresses
- **products** - Coffee products
- **orders** - Customer orders
- **order_items** - Items within orders
- **subscriptions** - Recurring deliveries

See `SUPABASE_SCHEMA.sql` for complete schema.

## 🔐 Security

- Row Level Security (RLS) policies on all tables
- Secure authentication with Supabase Auth
- CORS configuration
- Rate limiting on API endpoints
- Helmet.js security headers
- Input validation with Zod

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
cd frontend && npm run test:ui
```

## 📝 Development Commands

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm run test
```

## 🎯 Next Steps

- [ ] Implement checkout and payment with Stripe
- [ ] Add subscription management
- [ ] Build admin panel
- [ ] Add email notifications
- [ ] Implement order tracking
- [ ] Add product reviews
- [ ] Mobile app with React Native

## 📄 License

This project is proprietary and confidential.

---

**Café Monteverde** - Exclusive specialty coffee from Costa Rica's cloud forests ☕🌿
