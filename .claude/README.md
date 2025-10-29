# Claude Skills for Originate Coffee Marketplace

This directory contains custom Claude Skills to help develop the Originate platform.

## Available Skills

### 🗄️ Database Helper
**Trigger words:** schema, database, sql, supabase, migration, rls, policy

Helps with:
- Supabase schema design and migrations
- RLS (Row Level Security) policies
- Database functions and triggers
- Sample data generation
- SQL optimization

### 🎨 Component Builder
**Trigger words:** component, react, ui, page, design, styling, tailwind

Helps with:
- Creating React components following project patterns
- Implementing the dark coffee-themed design system
- Adding Framer Motion animations
- Building responsive layouts with Tailwind CSS
- TypeScript component typing

### 🔌 API Integrator
**Trigger words:** api, supabase, hook, fetch, query, authentication, auth

Helps with:
- Supabase API integration
- Custom React hooks for data fetching
- Authentication flows
- Error handling patterns
- Type-safe API calls

### ☕ Coffee Data Expert
**Trigger words:** coffee, product, roast, origin, tasting notes, supplier, monteverde

Helps with:
- Coffee industry terminology and data
- Product descriptions and pricing
- Supplier information (like Café Monteverde)
- Coffee processing methods
- Realistic sample data

### 🧪 Testing Helper
**Trigger words:** test, debug, error, fix, issue, bug

Helps with:
- Debugging common issues
- Testing authentication flows
- Checking RLS policies
- UI/UX testing
- Error troubleshooting

## How to Use

Simply mention relevant trigger words in your requests to Claude, and the appropriate skill will be activated with specialized knowledge for that area.

For example:
- "Help me create a new **component** for displaying coffee subscriptions" → Component Builder
- "I need to update the **schema** to add a reviews table" → Database Helper
- "Getting an **error** when fetching products" → Testing Helper
- "What are typical **tasting notes** for natural process coffee?" → Coffee Data Expert

## Project Context

**Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Supabase, Vite

**Design:** Dark theme with coffee/earth tones, orange accents, modern glassmorphism

**Key Features:** Multi-role marketplace (consumers, suppliers, company providers), products, orders, subscriptions, direct trade relationships

**Current Suppliers:** Café Monteverde (21 families, Costa Rica since 1989)
