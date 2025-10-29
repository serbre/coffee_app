-- Sample data for Originate V2 - Multi-Role Marketplace
-- Run this after running SUPABASE_SCHEMA_V2.sql

-- ============================================================================
-- IMPORTANT: Create users through the application first!
-- ============================================================================
-- You need to manually create these users through the signup flow:
-- 1. Company Provider user (will become Café Monteverde)
-- 2. At least one Supplier user
-- 3. At least one Consumer user
--
-- Then, replace the UUIDs below with the actual user IDs from auth.users table
-- ============================================================================

-- ============================================================================
-- STEP 1: Create Company Provider (Café Monteverde)
-- ============================================================================
-- After creating a user with role 'company_provider', insert company details:
-- Replace 'YOUR_COMPANY_PROVIDER_USER_ID' with actual UUID

/*
INSERT INTO company_providers (user_id, company_name, description, country) VALUES
(
  'YOUR_COMPANY_PROVIDER_USER_ID',
  'Café Monteverde',
  'A collective of 21 families dedicated to sustainable, seed-to-cup coffee production in the cloud forests of Monteverde, Costa Rica. We produce specialty single-origin Arabica coffee using three distinct milling processes: Fully Washed, Honey, and Natural. Committed to environmental sustainability, community impact, and connecting coffee lovers directly to the origin.',
  'Costa Rica'
);
*/

-- ============================================================================
-- STEP 2: Insert Products for Café Monteverde
-- ============================================================================
-- Replace 'CAFE_MONTEVERDE_COMPANY_ID' with the ID from company_providers table

/*
-- Products based on actual Café Monteverde offerings from https://cafedemonteverde.com/order-coffee/
INSERT INTO products (company_provider_id, name, description, price, category, roast_level, origin, tasting_notes, weight_grams, is_available) VALUES
-- Medium Roast Fully Washed (250g)
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Medium Roast - Fully Washed',
  'Classic medium roast with balanced flavor profile. Fully washed process brings out clean, bright notes perfect for everyday brewing.',
  16.00,
  'single-origin',
  'medium',
  'Monteverde, Costa Rica',
  ARRAY['balanced', 'clean', 'bright acidity'],
  250,
  true
),
-- Honey Process (250g)
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Honey Process Coffee',
  'Sweet and complex honey-processed coffee. The sticky mucilage left during drying creates a naturally sweet cup with enhanced body.',
  17.00,
  'single-origin',
  'medium',
  'Monteverde, Costa Rica',
  ARRAY['sweet', 'honey', 'fruity', 'full body'],
  250,
  true
),
-- Dark Roast Fully Washed (250g)
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Dark Roast - Fully Washed',
  'Bold dark roast for those who love intense flavor. Fully washed process ensures clean, robust taste with low acidity.',
  16.00,
  'single-origin',
  'dark',
  'Monteverde, Costa Rica',
  ARRAY['bold', 'smoky', 'low acidity', 'dark chocolate'],
  250,
  true
),
-- Natural Process (250g)
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Natural Process Coffee',
  'Fruit-forward natural process coffee. Beans dried inside the cherry for maximum sweetness and complex fruit notes.',
  17.00,
  'single-origin',
  'medium',
  'Monteverde, Costa Rica',
  ARRAY['fruity', 'berry', 'wine-like', 'sweet'],
  250,
  true
),
-- Cloud Forest Blend
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Cloud Forest Blend',
  'Our signature blend celebrating the unique terroir of Monteverde cloud forests. Carefully crafted for balance and complexity.',
  28.00,
  'blend',
  'medium',
  'Monteverde Cloud Forest, Costa Rica',
  ARRAY['balanced', 'complex', 'chocolate', 'caramel'],
  340,
  true
),
-- Light Roast Fully Washed (250g)
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Light Roast - Fully Washed',
  'Delicate light roast showcasing the coffee''s origin character. Bright, floral notes with tea-like clarity.',
  16.00,
  'single-origin',
  'light',
  'Monteverde, Costa Rica',
  ARRAY['bright', 'floral', 'citrus', 'tea-like'],
  250,
  true
),
-- Anaerobic Process Light Roast
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Anaerobic Process - Light Roast',
  'Innovative anaerobic fermentation creates unique flavor profiles. This experimental process yields extraordinary complexity.',
  15.00,
  'exclusive',
  'light',
  'Monteverde, Costa Rica',
  ARRAY['unique', 'complex', 'fruity', 'exotic'],
  250,
  true
),
-- Bundle Coffee Box
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Bundle Coffee Box',
  'Curated selection of our finest coffees. Perfect for exploring different roast levels and processing methods.',
  78.00,
  'exclusive',
  'medium',
  'Monteverde, Costa Rica',
  ARRAY['variety', 'sampler', 'gift'],
  1000,
  true
),
-- Collection Set
(
  'CAFE_MONTEVERDE_COMPANY_ID',
  'Collection Set',
  'Beautiful gift set featuring our signature coffees. An excellent introduction to Café Monteverde''s offerings.',
  47.50,
  'exclusive',
  'medium',
  'Monteverde, Costa Rica',
  ARRAY['gift set', 'variety', 'premium'],
  750,
  true
);
*/

-- ============================================================================
-- STEP 3: Create Supplier Profile
-- ============================================================================
-- After creating a user with role 'supplier', insert supplier details:
-- Replace 'YOUR_SUPPLIER_USER_ID' with actual UUID

/*
INSERT INTO suppliers (user_id, business_name, description, delivery_zones, location_city, location_state, location_country) VALUES
(
  'YOUR_SUPPLIER_USER_ID',
  'Café Monteverde Farm & Roastery',
  'Official Café Monteverde roastery located in the heart of Monteverde cloud forest. We are a collective of 21 families producing sustainable, specialty coffee. Roasted at origin and delivered fresh. Offering farm tours, tastings, and educational experiences. Open Monday-Sunday, 8am-5pm. Contact: info@cafedemonteverde.com',
  ARRAY['San José', 'Escazú', 'Santa Ana', 'Cartago', 'Atenas'],
  'Monteverde',
  'Puntarenas',
  'Costa Rica'
);
*/

-- ============================================================================
-- STEP 4: Create Supplier-Company Relationship
-- ============================================================================
-- Link the supplier to Café Monteverde
-- Replace the IDs with actual values

/*
INSERT INTO supplier_company_relationships (supplier_id, company_provider_id, status, approved_at, approved_by) VALUES
(
  'YOUR_SUPPLIER_ID',
  'CAFE_MONTEVERDE_COMPANY_ID',
  'approved',
  NOW(),
  'YOUR_COMPANY_PROVIDER_USER_ID'
);
*/

-- ============================================================================
-- STEP 5: Add Products to Supplier Inventory
-- ============================================================================
-- Add all products to the supplier's inventory
-- Replace IDs with actual values

/*
INSERT INTO supplier_inventory (supplier_id, product_id, stock_quantity, is_available)
SELECT
  'YOUR_SUPPLIER_ID',
  id,
  50,
  true
FROM products
WHERE company_provider_id = 'CAFE_MONTEVERDE_COMPANY_ID';
*/

-- ============================================================================
-- HELPER QUERIES
-- ============================================================================

-- Query to get user IDs after creating accounts:
-- SELECT id, email, raw_user_meta_data->>'role' as role FROM auth.users;

-- Query to get company provider ID:
-- SELECT id, company_name FROM company_providers;

-- Query to get supplier ID:
-- SELECT id, business_name FROM suppliers;

-- Query to get product IDs:
-- SELECT id, name FROM products WHERE company_provider_id = 'CAFE_MONTEVERDE_COMPANY_ID';

-- ============================================================================
-- AUTOMATED SETUP SCRIPT (Use after manual user creation)
-- ============================================================================

-- This function helps set up sample data after you've created users through the app
-- Usage:
-- 1. Create 3 users through the signup: company_provider, supplier, consumer
-- 2. Get their user IDs from auth.users
-- 3. Call: SELECT setup_sample_data('company_user_id', 'supplier_user_id', 'consumer_user_id');

CREATE OR REPLACE FUNCTION setup_sample_data(
  company_user_id UUID,
  supplier_user_id UUID,
  consumer_user_id UUID
)
RETURNS TEXT AS $$
DECLARE
  company_id UUID;
  supplier_id UUID;
BEGIN
  -- Create company provider
  INSERT INTO company_providers (user_id, company_name, description, country)
  VALUES (
    company_user_id,
    'Café Monteverde',
    'A collective of 21 families dedicated to sustainable, seed-to-cup coffee production in the cloud forests of Monteverde, Costa Rica. We produce specialty single-origin Arabica coffee using three distinct milling processes: Fully Washed, Honey, and Natural. Committed to environmental sustainability, community impact, and connecting coffee lovers directly to the origin.',
    'Costa Rica'
  )
  RETURNING id INTO company_id;

  -- Create supplier
  INSERT INTO suppliers (user_id, business_name, description, delivery_zones, location_city, location_country)
  VALUES (
    supplier_user_id,
    'Café Monteverde Farm & Roastery',
    'Official Café Monteverde roastery located in the heart of Monteverde cloud forest. A collective of 21 families producing sustainable, specialty coffee. Roasted at origin and delivered fresh. Offering farm tours, tastings, and educational experiences. Open Monday-Sunday, 8am-5pm. Contact: info@cafedemonteverde.com',
    ARRAY['Monteverde', 'Santa Elena', 'Puntarenas', 'San José', 'Heredia'],
    'Monteverde',
    'Costa Rica'
  )
  RETURNING id INTO supplier_id;

  -- Approve supplier relationship
  INSERT INTO supplier_company_relationships (supplier_id, company_provider_id, status, approved_at, approved_by)
  VALUES (supplier_id, company_id, 'approved', NOW(), company_user_id);

  -- Create products (based on Café Monteverde actual offerings)
  INSERT INTO products (company_provider_id, name, description, price, category, roast_level, origin, tasting_notes, weight_grams, is_available)
  VALUES
    -- Medium Roast Fully Washed (250g)
    (company_id, 'Medium Roast - Fully Washed', 'Classic medium roast with balanced flavor profile. Fully washed process brings out clean, bright notes perfect for everyday brewing.', 16.00, 'single-origin', 'medium', 'Monteverde, Costa Rica', ARRAY['balanced', 'clean', 'bright acidity'], 250, true),

    -- Honey Process (250g)
    (company_id, 'Honey Process Coffee', 'Sweet and complex honey-processed coffee. The sticky mucilage left during drying creates a naturally sweet cup with enhanced body.', 17.00, 'single-origin', 'medium', 'Monteverde, Costa Rica', ARRAY['sweet', 'honey', 'fruity', 'full body'], 250, true),

    -- Dark Roast Fully Washed (250g)
    (company_id, 'Dark Roast - Fully Washed', 'Bold dark roast for those who love intense flavor. Fully washed process ensures clean, robust taste with low acidity.', 16.00, 'single-origin', 'dark', 'Monteverde, Costa Rica', ARRAY['bold', 'smoky', 'low acidity', 'dark chocolate'], 250, true),

    -- Natural Process (250g)
    (company_id, 'Natural Process Coffee', 'Fruit-forward natural process coffee. Beans dried inside the cherry for maximum sweetness and complex fruit notes.', 17.00, 'single-origin', 'medium', 'Monteverde, Costa Rica', ARRAY['fruity', 'berry', 'wine-like', 'sweet'], 250, true),

    -- Cloud Forest Blend
    (company_id, 'Cloud Forest Blend', 'Our signature blend celebrating the unique terroir of Monteverde cloud forests. Carefully crafted for balance and complexity.', 28.00, 'blend', 'medium', 'Monteverde Cloud Forest, Costa Rica', ARRAY['balanced', 'complex', 'chocolate', 'caramel'], 340, true),

    -- Light Roast Fully Washed (250g)
    (company_id, 'Light Roast - Fully Washed', 'Delicate light roast showcasing the coffee\'s origin character. Bright, floral notes with tea-like clarity.', 16.00, 'single-origin', 'light', 'Monteverde, Costa Rica', ARRAY['bright', 'floral', 'citrus', 'tea-like'], 250, true),

    -- Anaerobic Process Light Roast
    (company_id, 'Anaerobic Process - Light Roast', 'Innovative anaerobic fermentation creates unique flavor profiles. This experimental process yields extraordinary complexity.', 15.00, 'exclusive', 'light', 'Monteverde, Costa Rica', ARRAY['unique', 'complex', 'fruity', 'exotic'], 250, true),

    -- Bundle Coffee Box
    (company_id, 'Bundle Coffee Box', 'Curated selection of our finest coffees. Perfect for exploring different roast levels and processing methods.', 78.00, 'exclusive', 'medium', 'Monteverde, Costa Rica', ARRAY['variety', 'sampler', 'gift'], 1000, true),

    -- Collection Set
    (company_id, 'Collection Set', 'Beautiful gift set featuring our signature coffees. An excellent introduction to Café Monteverde\'s offerings.', 47.50, 'exclusive', 'medium', 'Monteverde, Costa Rica', ARRAY['gift set', 'variety', 'premium'], 750, true);

  -- Add products to supplier inventory
  INSERT INTO supplier_inventory (supplier_id, product_id, stock_quantity, is_available)
  SELECT supplier_id, id, 50, true
  FROM products
  WHERE company_provider_id = company_id;

  -- Create consumer-supplier connection
  INSERT INTO consumer_supplier_connections (consumer_id, supplier_id, company_provider_id, status)
  VALUES (consumer_user_id, supplier_id, company_id, 'active');

  RETURN 'Sample data created successfully! Company: ' || company_id || ', Supplier: ' || supplier_id;
END;
$$ LANGUAGE plpgsql;
