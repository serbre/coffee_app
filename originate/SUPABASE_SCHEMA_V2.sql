-- Originate Database Schema V2 - Multi-Role Marketplace
-- Run this SQL in your Supabase SQL Editor
-- This schema supports: Company Provider, Supplier, Consumer roles

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('company_provider', 'supplier', 'consumer')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Providers table
CREATE TABLE IF NOT EXISTS company_providers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  country TEXT NOT NULL DEFAULT 'Costa Rica',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  description TEXT,
  delivery_zones TEXT[] DEFAULT '{}', -- Array of cities/zones they deliver to
  location_city TEXT,
  location_state TEXT,
  location_country TEXT NOT NULL DEFAULT 'Costa Rica',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Supplier-Company Provider relationship (many-to-many)
CREATE TABLE IF NOT EXISTS supplier_company_relationships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
  company_provider_id UUID REFERENCES company_providers(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(supplier_id, company_provider_id)
);

-- Consumer-Supplier connections (many-to-many)
CREATE TABLE IF NOT EXISTS consumer_supplier_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  consumer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
  company_provider_id UUID REFERENCES company_providers(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(consumer_id, supplier_id, company_provider_id)
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Costa Rica',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PRODUCT TABLES
-- ============================================================================

-- Products table (owned by Company Providers)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_provider_id UUID REFERENCES company_providers(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('single-origin', 'blend', 'seasonal', 'exclusive')),
  roast_level TEXT NOT NULL CHECK (roast_level IN ('light', 'medium', 'dark')),
  origin TEXT NOT NULL,
  tasting_notes TEXT[] DEFAULT '{}',
  weight_grams INTEGER NOT NULL CHECK (weight_grams > 0),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Supplier inventory (tracks what products each supplier offers)
CREATE TABLE IF NOT EXISTS supplier_inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(supplier_id, product_id)
);

-- ============================================================================
-- ORDER TABLES
-- ============================================================================

-- Orders table (relationship-based orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  consumer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
  company_provider_id UUID REFERENCES company_providers(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
  shipping_address_id UUID REFERENCES addresses(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_purchase DECIMAL(10, 2) NOT NULL CHECK (price_at_purchase >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- MESSAGING TABLES
-- ============================================================================

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_1_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  participant_2_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(participant_1_id, participant_2_id),
  CHECK (participant_1_id != participant_2_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SUBSCRIPTIONS TABLE
-- ============================================================================

-- Subscriptions table (consumer subscribes through their supplier)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  consumer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
  frequency TEXT NOT NULL CHECK (frequency IN ('weekly', 'biweekly', 'monthly')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  next_delivery_date DATE NOT NULL,
  shipping_address_id UUID REFERENCES addresses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_suppliers_user_id ON suppliers(user_id);
CREATE INDEX IF NOT EXISTS idx_supplier_company_rel_supplier ON supplier_company_relationships(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_company_rel_company ON supplier_company_relationships(company_provider_id);
CREATE INDEX IF NOT EXISTS idx_supplier_company_rel_status ON supplier_company_relationships(status);
CREATE INDEX IF NOT EXISTS idx_consumer_supplier_conn_consumer ON consumer_supplier_connections(consumer_id);
CREATE INDEX IF NOT EXISTS idx_consumer_supplier_conn_supplier ON consumer_supplier_connections(supplier_id);
CREATE INDEX IF NOT EXISTS idx_products_company ON products(company_provider_id);
CREATE INDEX IF NOT EXISTS idx_supplier_inventory_supplier ON supplier_inventory(supplier_id);
CREATE INDEX IF NOT EXISTS idx_orders_consumer ON orders(consumer_id);
CREATE INDEX IF NOT EXISTS idx_orders_supplier ON orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_1_id, participant_2_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_company_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumer_supplier_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES - PROFILES
-- ============================================================================

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view supplier and company provider profiles"
  ON profiles FOR SELECT
  USING (role IN ('supplier', 'company_provider'));

-- ============================================================================
-- RLS POLICIES - COMPANY PROVIDERS
-- ============================================================================

CREATE POLICY "Anyone can view active company providers"
  ON company_providers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Company providers can update own info"
  ON company_providers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Company providers can insert own info"
  ON company_providers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - SUPPLIERS
-- ============================================================================

CREATE POLICY "Anyone can view active suppliers"
  ON suppliers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Suppliers can update own info"
  ON suppliers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Suppliers can insert own info"
  ON suppliers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - SUPPLIER-COMPANY RELATIONSHIPS
-- ============================================================================

CREATE POLICY "Suppliers can view own relationships"
  ON supplier_company_relationships FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM suppliers WHERE suppliers.id = supplier_company_relationships.supplier_id AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Company providers can view their relationships"
  ON supplier_company_relationships FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM company_providers WHERE company_providers.id = supplier_company_relationships.company_provider_id AND company_providers.user_id = auth.uid()
  ));

CREATE POLICY "Suppliers can request relationships"
  ON supplier_company_relationships FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM suppliers WHERE suppliers.id = supplier_company_relationships.supplier_id AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Company providers can approve relationships"
  ON supplier_company_relationships FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM company_providers WHERE company_providers.id = supplier_company_relationships.company_provider_id AND company_providers.user_id = auth.uid()
  ));

-- ============================================================================
-- RLS POLICIES - CONSUMER-SUPPLIER CONNECTIONS
-- ============================================================================

CREATE POLICY "Consumers can view own connections"
  ON consumer_supplier_connections FOR SELECT
  USING (auth.uid() = consumer_id);

CREATE POLICY "Suppliers can view their connections"
  ON consumer_supplier_connections FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM suppliers WHERE suppliers.id = consumer_supplier_connections.supplier_id AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Consumers can create connections"
  ON consumer_supplier_connections FOR INSERT
  WITH CHECK (auth.uid() = consumer_id);

CREATE POLICY "Consumers can update own connections"
  ON consumer_supplier_connections FOR UPDATE
  USING (auth.uid() = consumer_id);

-- ============================================================================
-- RLS POLICIES - ADDRESSES
-- ============================================================================

CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - PRODUCTS
-- ============================================================================

CREATE POLICY "Anyone can view available products"
  ON products FOR SELECT
  USING (is_available = true);

CREATE POLICY "Company providers can manage their products"
  ON products FOR ALL
  USING (EXISTS (
    SELECT 1 FROM company_providers WHERE company_providers.id = products.company_provider_id AND company_providers.user_id = auth.uid()
  ));

-- ============================================================================
-- RLS POLICIES - SUPPLIER INVENTORY
-- ============================================================================

CREATE POLICY "Suppliers can manage their inventory"
  ON supplier_inventory FOR ALL
  USING (EXISTS (
    SELECT 1 FROM suppliers WHERE suppliers.id = supplier_inventory.supplier_id AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can view supplier inventory"
  ON supplier_inventory FOR SELECT
  USING (is_available = true);

-- ============================================================================
-- RLS POLICIES - ORDERS
-- ============================================================================

CREATE POLICY "Consumers can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = consumer_id);

CREATE POLICY "Suppliers can view their orders"
  ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM suppliers WHERE suppliers.id = orders.supplier_id AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Company providers can view their orders"
  ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM company_providers WHERE company_providers.id = orders.company_provider_id AND company_providers.user_id = auth.uid()
  ));

CREATE POLICY "Consumers can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = consumer_id);

CREATE POLICY "Suppliers and consumers can update orders"
  ON orders FOR UPDATE
  USING (
    auth.uid() = consumer_id OR
    EXISTS (SELECT 1 FROM suppliers WHERE suppliers.id = orders.supplier_id AND suppliers.user_id = auth.uid())
  );

-- ============================================================================
-- RLS POLICIES - ORDER ITEMS
-- ============================================================================

CREATE POLICY "Users can view order items for their orders"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (
      orders.consumer_id = auth.uid() OR
      EXISTS (SELECT 1 FROM suppliers WHERE suppliers.id = orders.supplier_id AND suppliers.user_id = auth.uid()) OR
      EXISTS (SELECT 1 FROM company_providers WHERE company_providers.id = orders.company_provider_id AND company_providers.user_id = auth.uid())
    )
  ));

CREATE POLICY "Consumers can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.consumer_id = auth.uid()
  ));

-- ============================================================================
-- RLS POLICIES - SUBSCRIPTIONS
-- ============================================================================

CREATE POLICY "Consumers can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = consumer_id);

CREATE POLICY "Suppliers can view their subscriptions"
  ON subscriptions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM suppliers WHERE suppliers.id = subscriptions.supplier_id AND suppliers.user_id = auth.uid()
  ));

CREATE POLICY "Consumers can manage own subscriptions"
  ON subscriptions FOR ALL
  USING (auth.uid() = consumer_id);

-- ============================================================================
-- RLS POLICIES - CONVERSATIONS & MESSAGES
-- ============================================================================

CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND (
      conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid()
    )
  ));

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id AND EXISTS (
    SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND (
      conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid()
    )
  ));

CREATE POLICY "Users can mark messages as read"
  ON messages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND (
      conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid()
    )
  ));

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_providers_updated_at BEFORE UPDATE ON company_providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supplier_company_relationships_updated_at BEFORE UPDATE ON supplier_company_relationships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consumer_supplier_connections_updated_at BEFORE UPDATE ON consumer_supplier_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supplier_inventory_updated_at BEFORE UPDATE ON supplier_inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'consumer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
