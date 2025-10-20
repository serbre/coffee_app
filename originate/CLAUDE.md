# CLAUDE.md

This file provides guidance to Claude Code when working with the Originate codebase.

## Project Overview

Originate is a multi-provider specialty coffee marketplace connecting coffee enthusiasts with premium roasters worldwide. It's a full-stack application with React frontend and Supabase backend.

## Development Commands

### Quick Start
```bash
npm run install:all   # Install all dependencies
npm run dev          # Start both frontend and backend servers
```

### Frontend (React + TypeScript + Vite)
```bash
cd frontend
npm run dev          # Start development server on localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
```

### Backend (Express.js + Node.js)
```bash
cd backend
npm run dev          # Start development server with nodemon on localhost:3001
npm start           # Start production server
```

### Full Stack Commands
```bash
npm run dev          # Start both servers concurrently
npm run build        # Build frontend for production
npm run test         # Run frontend tests
npm run lint         # Run frontend linter
```

### Database Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `SUPABASE_SCHEMA.sql` in Supabase SQL Editor
3. Optionally run `SAMPLE_DATA.sql` for sample products
4. Copy environment files and add your Supabase credentials:
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

## Architecture Overview

### Frontend Architecture
- **React 18** with TypeScript and Vite for fast development
- **Tailwind CSS** for styling with coffee-inspired color palette
- **Framer Motion** for animations and transitions
- **React Router** for client-side routing
- **Supabase Client** for authentication and database access
- **Context-based state management**: AuthContext, CartContext
- **Component structure**: Shared components in `src/shared/components/`
- **Page-based routing**: Main pages in `src/pages/` directory

### Backend Architecture
- **Supabase** for database, authentication, and storage
- **Simple Express.js API** for webhook handling and server-side operations
- **CORS enabled** for frontend communication
- **Security middleware**: Helmet, rate limiting
- **Environment-based configuration**

### Database Architecture
- **PostgreSQL** via Supabase
- **Row Level Security (RLS)** on all tables for security
- **Optimized indexes** for performance
- **Tables**: profiles, addresses, products, orders, order_items, subscriptions
- **Automated triggers** for updated_at timestamps
- **Auth integration** with Supabase Auth
- **Multi-roaster support** ready for future expansion

### Key Patterns
- **Monorepo structure**: Frontend and backend in separate directories
- **Modern React patterns**: Functional components, hooks, and context
- **TypeScript throughout**: Full type safety in frontend code
- **Responsive design**: Mobile-first approach with Tailwind CSS
- **Component organization**: Shared components for reusability
- **Glass morphism design**: Semi-transparent cards with backdrop blur
- **Coffee-inspired theme**: Warm browns, greens, and earth tones
- **Marketplace-ready**: Architecture supports multiple roasters/providers

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Heroicons, Supabase Client, Stripe
- **Backend**: Node.js, Express.js, CORS, Helmet, Rate Limiting, Stripe
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe (Coming Soon)
- **Development**: ESLint, Vitest, React Testing Library
- **Validation**: Zod (frontend and backend)

## Project Structure

```
originate/
├── frontend/
│   ├── src/
│   │   ├── shared/
│   │   │   ├── components/    # Reusable UI (Navbar, ProductCard)
│   │   │   ├── contexts/      # React contexts (Auth, Cart)
│   │   │   ├── hooks/         # Custom hooks (useProducts)
│   │   │   ├── lib/           # External libs (Supabase client)
│   │   │   ├── types/         # TypeScript interfaces
│   │   │   └── utils/         # Utility functions
│   │   ├── pages/             # Page components (Home, Products, Cart, Login)
│   │   ├── App.tsx            # Main app with routing
│   │   └── index.css          # Global styles with Tailwind
├── backend/
│   └── src/
│       └── server.js          # Express API server
├── SUPABASE_SCHEMA.sql        # Database schema
├── SAMPLE_DATA.sql            # Sample product data
└── README.md
```

## Current Implementation Status

### ✅ Completed
- Project structure and configuration
- Supabase database schema with RLS policies
- Authentication system (signup, login, logout)
- Product catalog with filtering
- Shopping cart functionality
- Product listing and detail views
- Responsive navbar with cart indicator
- Coffee-inspired theme and design system
- Multi-roaster architecture foundation

### 🚧 In Progress / Coming Soon
- Checkout and payment processing (Stripe integration)
- Order management system
- Subscription management
- User dashboard (order history, subscriptions)
- Roaster profiles and discovery
- Admin panel for inventory and order management
- Multi-roaster vendor management
- Email notifications
- Product reviews and ratings

## Design System

### Color Palette
- **Coffee tones** (`coffee-50` to `coffee-900`): Primary brand colors
- **Green Mountain** (`green-mountain-50` to `green-mountain-900`): Accent colors
- **Glass morphism**: `bg-white/10 backdrop-blur-md border border-white/20`

### Components
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Cards**: `.glass-card`, `.product-card`
- **Inputs**: `.input-field`
- **Animations**: Framer Motion for smooth transitions

### Typography
- **Display font**: Georgia (serif) for headings
- **Body font**: Inter (sans-serif) for content

## Development Guidelines

1. **File Organization**:
   - Shared components go in `src/shared/components/`
   - Page-specific components can go in their respective page files
   - Reusable hooks in `src/shared/hooks/`
   - Type definitions in `src/shared/types/`

2. **State Management**:
   - Use React Context for app-wide state (Auth, Cart)
   - Use local state for component-specific state
   - Custom hooks for data fetching (e.g., `useProducts`)

3. **Styling**:
   - Use Tailwind utility classes
   - Follow the established coffee-themed color palette
   - Maintain glass morphism design pattern
   - Ensure responsive design (mobile-first)

4. **Database Access**:
   - Use Supabase client for all database operations
   - RLS policies are enforced - respect user permissions
   - Always handle loading and error states

5. **Security**:
   - Never expose service role keys in frontend
   - Use RLS policies for data access control
   - Validate user input with Zod
   - Use environment variables for sensitive data

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `Navbar.tsx` if needed

### Adding a New Supabase Table
1. Add SQL to `SUPABASE_SCHEMA.sql`
2. Run SQL in Supabase SQL Editor
3. Add TypeScript types to `src/shared/types/index.ts`
4. Create custom hook in `src/shared/hooks/` if needed
5. Set up RLS policies

### Working with Environment Variables
- Frontend: Prefix with `VITE_` and access via `import.meta.env.VITE_*`
- Backend: Use `process.env.*` with dotenv
- Never commit `.env` files
- Always update `.env.example` when adding new variables

## Marketplace Features

Originate is designed as a multi-provider marketplace:
- Products can be associated with different roasters
- Architecture supports vendor management
- Future features include roaster profiles and discovery
- Reviews and ratings system planned for both products and roasters

## Notes

- The application follows the same architectural patterns as OKR_TEMPLATE
- Supabase handles most backend functionality (auth, database, storage)
- Express backend is minimal - mainly for webhooks and server-side operations
- Cart is stored in localStorage for persistence
- Authentication uses Supabase Auth with RLS for security
- The name "Originate" reflects the marketplace's focus on connecting consumers with the origins of their coffee
