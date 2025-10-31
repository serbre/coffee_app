import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_purchase: number
  product?: {
    name: string
    image_url: string
    roast_level: string
    origin: string
  }
}

export interface Order {
  id: string
  consumer_id: string
  supplier_id: string
  company_provider_id: string
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address_id: string
  notes: string | null
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
  supplier?: {
    business_name: string
  }
  shipping_address?: {
    street: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

export const useOrders = () => {
  const { user, profile } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && profile?.role === 'consumer') {
      fetchOrders()
    }
  }, [user, profile])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          supplier:suppliers (business_name),
          shipping_address:addresses (
            street,
            city,
            state,
            postal_code,
            country
          ),
          order_items (
            *,
            product:products (
              name,
              image_url,
              roast_level,
              origin
            )
          )
        `)
        .eq('consumer_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData: {
    supplier_id: string
    company_provider_id: string
    shipping_address_id: string
    total_amount: number
    notes?: string
    items: Array<{
      product_id: string
      quantity: number
      price_at_purchase: number
    }>
  }) => {
    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          consumer_id: user?.id,
          supplier_id: orderData.supplier_id,
          company_provider_id: orderData.company_provider_id,
          shipping_address_id: orderData.shipping_address_id,
          total_amount: orderData.total_amount,
          notes: orderData.notes || null,
          status: 'pending'
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      await fetchOrders()
      return { success: true, order, error: null }
    } catch (err: any) {
      return { success: false, order: null, error: err.message }
    }
  }

  const cancelOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)

      if (error) throw error
      await fetchOrders()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    createOrder,
    cancelOrder,
  }
}
