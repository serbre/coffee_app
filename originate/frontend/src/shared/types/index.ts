// Database Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: 'single-origin' | 'blend' | 'seasonal' | 'exclusive'
  roast_level: 'light' | 'medium' | 'dark'
  origin: string
  tasting_notes: string[]
  weight_grams: number
  stock_quantity: number
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address: Address
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_purchase: number
  product?: Product
}

export interface Subscription {
  id: string
  user_id: string
  product_id: string
  frequency: 'weekly' | 'biweekly' | 'monthly'
  quantity: number
  status: 'active' | 'paused' | 'cancelled'
  next_delivery_date: string
  created_at: string
  updated_at: string
  product?: Product
}

export interface Address {
  street: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  phone: string | null
  shipping_address: Address | null
  created_at: string
  updated_at: string
}

// Cart Types
export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Auth Types
export interface AuthUser {
  id: string
  email: string
  role: 'customer' | 'admin'
}
