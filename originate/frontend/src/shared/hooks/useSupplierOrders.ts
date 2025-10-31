import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useSupplierProfile } from './useSupplierProfile'
import type { Order } from './useOrders'

export const useSupplierOrders = () => {
  const { user } = useAuth()
  const { supplierProfile } = useSupplierProfile()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (supplierProfile) {
      fetchOrders()
    }
  }, [supplierProfile])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          consumer:profiles!orders_consumer_id_fkey (full_name, email),
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
        .eq('supplier_id', supplierProfile?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (
    orderId: string,
    status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
  ) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)

      if (error) throw error
      await fetchOrders()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'shipped'].includes(o.status))

  return {
    orders,
    pendingOrders,
    activeOrders,
    loading,
    error,
    refetch: fetchOrders,
    updateOrderStatus,
  }
}
