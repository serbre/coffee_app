import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface SupplierProfile {
  id: string
  user_id: string
  business_name: string
  description: string
  delivery_zones: string[]
  location_city: string
  location_state: string
  location_country: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useSupplierProfile = () => {
  const { user, profile } = useAuth()
  const [supplierProfile, setSupplierProfile] = useState<SupplierProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && profile?.role === 'supplier') {
      fetchSupplierProfile()
    } else {
      setLoading(false)
    }
  }, [user, profile])

  const fetchSupplierProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      setSupplierProfile(data || null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createSupplierProfile = async (profileData: {
    business_name: string
    description: string
    delivery_zones: string[]
    location_city: string
    location_state: string
    location_country: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert([{
          user_id: user?.id,
          ...profileData,
          is_active: true
        }])
        .select()
        .single()

      if (error) throw error

      setSupplierProfile(data)
      return { success: true, data, error: null }
    } catch (err: any) {
      return { success: false, data: null, error: err.message }
    }
  }

  const updateSupplierProfile = async (updates: Partial<SupplierProfile>) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .update(updates)
        .eq('user_id', user?.id)
        .select()
        .single()

      if (error) throw error

      setSupplierProfile(data)
      return { success: true, data, error: null }
    } catch (err: any) {
      return { success: false, data: null, error: err.message }
    }
  }

  const hasCompletedProfile = !!supplierProfile

  return {
    supplierProfile,
    loading,
    error,
    refetch: fetchSupplierProfile,
    createSupplierProfile,
    updateSupplierProfile,
    hasCompletedProfile,
  }
}
