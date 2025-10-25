// ============================================================================
// USER & PROFILE TYPES
// ============================================================================

export type UserRole = 'company_provider' | 'supplier' | 'consumer'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  street: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// ============================================================================
// COMPANY PROVIDER TYPES
// ============================================================================

export interface CompanyProvider {
  id: string
  user_id: string
  company_name: string
  description: string | null
  logo_url: string | null
  website: string | null
  country: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================================================
// SUPPLIER TYPES
// ============================================================================

export interface Supplier {
  id: string
  user_id: string
  business_name: string
  description: string | null
  delivery_zones: string[]
  location_city: string | null
  location_state: string | null
  location_country: string
  is_active: boolean
  created_at: string
  updated_at: string
  // Populated fields
  profile?: Profile
}

export interface SupplierCompanyRelationship {
  id: string
  supplier_id: string
  company_provider_id: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  approved_at: string | null
  approved_by: string | null
  created_at: string
  updated_at: string
  // Populated fields
  supplier?: Supplier
  company_provider?: CompanyProvider
}

export interface ConsumerSupplierConnection {
  id: string
  consumer_id: string
  supplier_id: string
  company_provider_id: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  // Populated fields
  supplier?: Supplier
  company_provider?: CompanyProvider
}

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface Product {
  id: string
  company_provider_id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: 'single-origin' | 'blend' | 'seasonal' | 'exclusive'
  roast_level: 'light' | 'medium' | 'dark'
  origin: string
  tasting_notes: string[]
  weight_grams: number
  is_available: boolean
  created_at: string
  updated_at: string
  // Populated fields
  company_provider?: CompanyProvider
}

export interface SupplierInventory {
  id: string
  supplier_id: string
  product_id: string
  stock_quantity: number
  is_available: boolean
  created_at: string
  updated_at: string
  // Populated fields
  product?: Product
  supplier?: Supplier
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export interface Order {
  id: string
  consumer_id: string
  supplier_id: string
  company_provider_id: string
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
  // Populated fields
  items?: OrderItem[]
  supplier?: Supplier
  company_provider?: CompanyProvider
  shipping_address?: Address
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_purchase: number
  created_at: string
  // Populated fields
  product?: Product
}

// ============================================================================
// SUBSCRIPTION TYPES
// ============================================================================

export interface Subscription {
  id: string
  consumer_id: string
  supplier_id: string
  product_id: string
  frequency: 'weekly' | 'biweekly' | 'monthly'
  quantity: number
  status: 'active' | 'paused' | 'cancelled'
  next_delivery_date: string
  shipping_address_id: string | null
  created_at: string
  updated_at: string
  // Populated fields
  product?: Product
  supplier?: Supplier
}

// ============================================================================
// MESSAGING TYPES
// ============================================================================

export interface Conversation {
  id: string
  participant_1_id: string
  participant_2_id: string
  last_message_at: string
  created_at: string
  updated_at: string
  // Populated fields
  participant_1?: Profile
  participant_2?: Profile
  last_message?: Message
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  is_read: boolean
  created_at: string
  // Populated fields
  sender?: Profile
}

// ============================================================================
// UI/HELPER TYPES
// ============================================================================

// For backward compatibility with cart (will be removed later)
export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}
