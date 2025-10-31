import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useCompanyProfile } from './useCompanyProfile'

export interface CompanySupplierRelationship {
  id: string
  supplier_id: string
  company_provider_id: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  approved_at: string | null
  approved_by: string | null
  created_at: string
  updated_at: string
  supplier?: {
    id: string
    business_name: string
    location_city: string
    location_state: string
    location_country: string
    delivery_zones: string[]
  }
}

export const useCompanySuppliers = () => {
  const { companyProfile } = useCompanyProfile()
  const [relationships, setRelationships] = useState<CompanySupplierRelationship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (companyProfile) {
      fetchRelationships()
    }
  }, [companyProfile])

  const fetchRelationships = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('supplier_company_relationships')
        .select(`
          *,
          supplier:suppliers (
            id,
            business_name,
            location_city,
            location_state,
            location_country,
            delivery_zones
          )
        `)
        .eq('company_provider_id', companyProfile?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRelationships(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const approveSupplier = async (relationshipId: string) => {
    try {
      const { error } = await supabase
        .from('supplier_company_relationships')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: companyProfile?.user_id
        })
        .eq('id', relationshipId)

      if (error) throw error
      await fetchRelationships()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const rejectSupplier = async (relationshipId: string) => {
    try {
      const { error } = await supabase
        .from('supplier_company_relationships')
        .update({ status: 'rejected' })
        .eq('id', relationshipId)

      if (error) throw error
      await fetchRelationships()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const pendingSuppliers = relationships.filter(r => r.status === 'pending')
  const approvedSuppliers = relationships.filter(r => r.status === 'approved')

  return {
    relationships,
    pendingSuppliers,
    approvedSuppliers,
    loading,
    error,
    refetch: fetchRelationships,
    approveSupplier,
    rejectSupplier,
  }
}
