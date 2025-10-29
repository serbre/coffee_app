-- Update Café Monteverde supplier location and delivery zones
-- Run this in Supabase SQL Editor

UPDATE suppliers
SET
  location_city = 'Monteverde',
  location_state = 'Puntarenas',
  location_country = 'Costa Rica',
  delivery_zones = ARRAY['San José', 'Escazú', 'Santa Ana', 'Cartago', 'Atenas']
WHERE business_name LIKE '%Monteverde%';

-- Verify the update
SELECT id, business_name, location_city, location_state, location_country, delivery_zones
FROM suppliers
WHERE business_name LIKE '%Monteverde%';
