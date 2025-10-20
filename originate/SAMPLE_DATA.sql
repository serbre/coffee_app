-- Sample data for Originate
-- Run this after running SUPABASE_SCHEMA.sql

-- Insert sample products
INSERT INTO products (name, description, price, category, roast_level, origin, tasting_notes, weight_grams, stock_quantity, is_available) VALUES
(
  'Monteverde Reserve',
  'Our exclusive signature blend from the highlands of Costa Rica. Handpicked beans with notes of chocolate, caramel, and hints of citrus.',
  24.99,
  'exclusive',
  'medium',
  'Monteverde, Costa Rica',
  ARRAY['chocolate', 'caramel', 'citrus'],
  340,
  50,
  true
),
(
  'Single Origin - Tarrazú',
  'Premium single-origin coffee from the renowned Tarrazú region. Known for its bright acidity and full body.',
  22.99,
  'single-origin',
  'medium',
  'Tarrazú, Costa Rica',
  ARRAY['bright acidity', 'full body', 'berry notes'],
  340,
  30,
  true
),
(
  'Dark Mountain Roast',
  'Bold and intense dark roast for those who love a strong cup. Perfect for espresso.',
  19.99,
  'blend',
  'dark',
  'Central Valley, Costa Rica',
  ARRAY['bold', 'smoky', 'dark chocolate'],
  340,
  40,
  true
),
(
  'Light Cloud Forest',
  'Light roast celebrating the delicate flavors of high-altitude beans. Floral and fruity.',
  21.99,
  'single-origin',
  'light',
  'Monteverde Cloud Forest',
  ARRAY['floral', 'fruity', 'tea-like'],
  340,
  25,
  true
),
(
  'Seasonal Harvest - Holiday Blend',
  'Limited edition seasonal blend with warm spices and festive notes.',
  26.99,
  'seasonal',
  'medium',
  'Multiple Regions, Costa Rica',
  ARRAY['cinnamon', 'nutmeg', 'vanilla', 'brown sugar'],
  340,
  15,
  true
),
(
  'Espresso Perfecto',
  'Specially crafted blend for the perfect espresso shot. Rich crema and balanced flavor.',
  23.99,
  'blend',
  'dark',
  'Central Valley, Costa Rica',
  ARRAY['rich crema', 'balanced', 'hazelnut'],
  340,
  35,
  true
);

-- Note: To create a sample admin user, you'll need to:
-- 1. Sign up through your application
-- 2. Then run this SQL to make that user an admin:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
