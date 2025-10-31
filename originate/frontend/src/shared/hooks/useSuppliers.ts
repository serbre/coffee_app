import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Supplier } from '../types'

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('suppliers')
        .select(`
          *,
          supplier_company_relationships!inner (
            company_provider_id,
            status
          )
        `)
        .eq('supplier_company_relationships.status', 'approved')
        .order('business_name')

      if (error) throw error

      setSuppliers(data || [])
    } catch (err) {
      console.error('Error fetching suppliers:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch suppliers')
    } finally {
      setLoading(false)
    }
  }

  return { suppliers, loading, error, refetch: fetchSuppliers }
}
