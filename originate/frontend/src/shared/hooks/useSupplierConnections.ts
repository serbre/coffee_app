import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface SupplierConnection {
  id: string
  consumer_id: string
  supplier_id: string
  company_provider_id: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  supplier?: {
    id: string
    business_name: string
    description: string
    location_city: string
    location_state: string
    location_country: string
    delivery_zones: string[]
  }
  company_provider?: {
    id: string
    company_name: string
    logo_url: string
  }
}

export const useSupplierConnections = () => {
  const { user, profile } = useAuth()
  const [connections, setConnections] = useState<SupplierConnection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && profile?.role === 'consumer') {
      fetchConnections()
    }
  }, [user, profile])

  const fetchConnections = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('consumer_supplier_connections')
        .select(`
          *,
          supplier:suppliers!inner (
            id,
            business_name,
            description,
            location_city,
            location_state,
            location_country,
            delivery_zones
          ),
          company_provider:company_providers!inner (
            id,
            company_name,
            logo_url
          )
        `)
        .eq('consumer_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setConnections(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const connectWithSupplier = async (supplierId: string, companyProviderId: string) => {
    try {
      const { data, error } = await supabase
        .from('consumer_supplier_connections')
        .insert([{
          consumer_id: user?.id,
          supplier_id: supplierId,
          company_provider_id: companyProviderId,
          status: 'active'
        }])
        .select()
        .single()

      if (error) throw error
      await fetchConnections()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const disconnectFromSupplier = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('consumer_supplier_connections')
        .update({ status: 'inactive' })
        .eq('id', connectionId)

      if (error) throw error
      await fetchConnections()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const reconnectWithSupplier = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('consumer_supplier_connections')
        .update({ status: 'active' })
        .eq('id', connectionId)

      if (error) throw error
      await fetchConnections()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const isConnectedToSupplier = (supplierId: string) => {
    return connections.some(
      conn => conn.supplier_id === supplierId && conn.status === 'active'
    )
  }

  const activeConnections = connections.filter(conn => conn.status === 'active')

  return {
    connections,
    activeConnections,
    loading,
    error,
    refetch: fetchConnections,
    connectWithSupplier,
    disconnectFromSupplier,
    reconnectWithSupplier,
    isConnectedToSupplier,
  }
}
