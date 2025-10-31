import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useSupplierProfile } from './useSupplierProfile'

export interface SupplierConsumer {
  id: string
  consumer_id: string
  supplier_id: string
  company_provider_id: string
  status: 'active' | 'inactive'
  created_at: string
  consumer?: {
    full_name: string
    email: string
  }
}

export const useSupplierConsumers = () => {
  const { supplierProfile } = useSupplierProfile()
  const [consumers, setConsumers] = useState<SupplierConsumer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (supplierProfile) {
      fetchConsumers()
    }
  }, [supplierProfile])

  const fetchConsumers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('consumer_supplier_connections')
        .select(`
          *,
          consumer:profiles!consumer_supplier_connections_consumer_id_fkey (
            full_name,
            email
          )
        `)
        .eq('supplier_id', supplierProfile?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setConsumers(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const activeConsumers = consumers.filter(c => c.status === 'active')

  return {
    consumers,
    activeConsumers,
    loading,
    error,
    refetch: fetchConsumers,
  }
}
