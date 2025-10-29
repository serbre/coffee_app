# Originate V2 - Migration Guide
## From E-commerce Cart to Multi-Role Marketplace

This document outlines the changes from the standard e-commerce model to the new 3-role relationship-based marketplace.

---

## 🎯 System Overview

### **Previous Model** (V1)
- Single user type: Consumer
- Standard shopping cart
- Anonymous browse → Add to cart → Checkout
- Products owned by platform

### **New Model** (V2)
- **3 User Roles**: Company Provider, Supplier, Consumer
- Relationship-based ordering
- Direct connections between roles
- Products owned by Company Providers, distributed through Suppliers

---

## 📊 Database Changes

### New Tables Created:
1. **`company_providers`** - Coffee companies/brands
2. **`suppliers`** - Local distributors representing companies
3. **`supplier_company_relationships`** - Many-to-many (Supplier ↔ Company)
4. **`consumer_supplier_connections`** - Consumer's active supplier relationships
5. **`supplier_inventory`** - What products each supplier offers
6. **`conversations`** - Message threads between users
7. **`messages`** - Individual messages

### Modified Tables:
- **`profiles`** - Now has `role` field: 'company_provider' | 'supplier' | 'consumer'
- **`products`** - Now belongs to `company_provider_id` (not platform)
- **`orders`** - Now includes `supplier_id` and `company_provider_id`
- **`subscriptions`** - Now includes `supplier_id`

### Removed Concepts:
- Platform-owned products (now company-owned)
- Anonymous shopping cart (now relationship-based)
- `stock_quantity` on products (moved to `supplier_inventory`)

---

## 🔄 User Flows

### 1. Company Provider Flow
**Initial Setup:**
1. Sign up with role 'company_provider'
2. Create company profile (Café Monteverde)
3. Add products to catalog
4. Wait for supplier applications

**Ongoing:**
- Approve/reject supplier applications
- Manage product catalog
- View sales analytics across all suppliers
- Message suppliers
- Message consumers directly

### 2. Supplier Flow
**Initial Setup:**
1. Sign up with role 'supplier'
2. Create supplier profile (business name, delivery zones)
3. Apply to represent Company Provider(s)
4. Wait for approval
5. Once approved, add company's products to inventory

**Ongoing:**
- Manage local inventory
- Accept consumer connections
- Process orders from connected consumers
- Message consumers
- Message company providers

### 3. Consumer Flow
**Initial Setup:**
1. Sign up with role 'consumer'
2. Browse available suppliers
3. Connect with local supplier(s)

**Ongoing:**
- Place orders through supplier relationship
- Message suppliers
- Message company providers
- View order history
- Manage subscriptions

---

## 💬 Communication Matrix

| From → To | Consumer | Supplier | Company Provider |
|-----------|----------|----------|------------------|
| **Consumer** | - | ✅ Yes | ✅ Yes |
| **Supplier** | ✅ Yes | - | ✅ Yes |
| **Company Provider** | ✅ Yes | ✅ Yes | - |

Everyone can message everyone!

---

## 🚀 Migration Steps

### Step 1: Update Database Schema

```sql
-- In Supabase SQL Editor, run:
-- File: SUPABASE_SCHEMA_V2.sql
```

This will create all new tables and update existing ones.

### Step 2: Create Sample Data

**Option A: Manual Setup**
1. Sign up 3 test accounts (one for each role)
2. Follow instructions in `SAMPLE_DATA_V2.sql` comments

**Option B: Automated Setup**
1. Sign up 3 test accounts
2. Get their user IDs from `auth.users`
3. Run:
```sql
SELECT setup_sample_data(
  'company_user_id',
  'supplier_user_id',
  'consumer_user_id'
);
```

### Step 3: Update Frontend Code

✅ **Already Updated:**
- TypeScript types (`types/index.ts`)
- AuthContext with role support

🔨 **TODO:**
- Update LoginPage to include role selection
- Create role-specific dashboards
- Build supplier browse/discovery page
- Implement messaging system
- Replace cart with direct ordering

---

## 📝 Next Implementation Steps

### Priority 1: Authentication & Onboarding
- [ ] Update signup form with role selector
- [ ] Create post-signup profile setup per role:
  - Company: Company name, description
  - Supplier: Business name, delivery zones
  - Consumer: Shipping address

### Priority 2: Core Dashboards
- [ ] Company Provider Dashboard:
  - Supplier management (approve/reject)
  - Product catalog management
  - Analytics
- [ ] Supplier Dashboard:
  - Inventory management
  - Consumer connections
  - Order fulfillment
- [ ] Consumer Dashboard:
  - Supplier discovery/browse
  - Active connections
  - Order history

### Priority 3: Messaging
- [ ] Conversation list component
- [ ] Chat interface
- [ ] Real-time message updates (Supabase Realtime)
- [ ] Unread message indicators

### Priority 4: Ordering
- [ ] Replace cart with supplier-based ordering
- [ ] Order creation flow
- [ ] Order status tracking
- [ ] Supplier order management

---

## 🔍 Key Relationships

```
Company Provider (Café Monteverde)
  ↓ approves
Supplier (San José Location)
  ↓ stocks products from
Company Provider's Products
  ↓ sold through
Supplier → Consumer Connection
  ↓ enables
Orders & Subscriptions
```

---

## 🎨 UI/UX Changes

### Old: Shopping Cart Flow
```
Browse Products → Add to Cart → Checkout → Order
```

### New: Relationship Flow
```
Browse Suppliers → Connect with Supplier → Browse Their Catalog → Place Order
```

### Key UI Differences:
- **No global cart** - Orders are per-supplier relationship
- **Supplier discovery page** - Find local suppliers
- **Connection requests** - Explicit consumer-supplier linking
- **Messaging integration** - Direct communication built-in
- **Role-specific nav** - Different menus per role

---

## ⚠️ Breaking Changes

1. **Products API**
   - Old: `products.stock_quantity`
   - New: `supplier_inventory.stock_quantity`

2. **Orders**
   - Old: `orders.user_id`
   - New: `orders.consumer_id`, `orders.supplier_id`, `orders.company_provider_id`

3. **Authentication**
   - Old: `signUp(email, password, name)`
   - New: `signUp(email, password, name, role)`

4. **Profile**
   - Old: No role field
   - New: Required `role` field

---

## 📦 Files Changed

### New Files:
- `SUPABASE_SCHEMA_V2.sql` - New database schema
- `SAMPLE_DATA_V2.sql` - Sample data for V2
- `MIGRATION_GUIDE.md` - This file

### Modified Files:
- `frontend/src/shared/types/index.ts` - Complete rewrite with new types
- `frontend/src/shared/contexts/AuthContext.tsx` - Added role support

### Files to Update:
- `frontend/src/pages/LoginPage.tsx` - Add role selector
- `frontend/src/pages/HomePage.tsx` - Update messaging
- `frontend/src/pages/ProductsPage.tsx` - Filter by supplier
- Create: `frontend/src/pages/DashboardPage.tsx` - Role-based dashboard
- Create: `frontend/src/pages/SuppliersPage.tsx` - Browse suppliers
- Create: `frontend/src/pages/MessagesPage.tsx` - Messaging interface

---

## 🔐 Security Notes

- All tables have Row Level Security (RLS) enabled
- Users can only see data relevant to their role and relationships
- Suppliers can only be approved by Company Providers
- Orders can only be created by connected consumers
- Messages are only visible to participants

---

## 🧪 Testing Checklist

- [ ] Create all 3 role types
- [ ] Company approves supplier
- [ ] Supplier adds inventory
- [ ] Consumer connects to supplier
- [ ] Consumer places order
- [ ] All 3 roles can message each other
- [ ] Subscription creation
- [ ] RLS policies work correctly

---

**Last Updated:** October 19, 2024
**Version:** 2.0.0
**Status:** Schema Complete, Frontend In Progress
