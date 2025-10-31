import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface CompanyProfile {
  id: string
  user_id: string
  company_name: string
  description: string
  logo_url: string | null
  website: string | null
  country: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useCompanyProfile = () => {
  const { user, profile } = useAuth()
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && profile?.role === 'company_provider') {
      fetchCompanyProfile()
    } else {
      setLoading(false)
    }
  }, [user, profile])

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('company_providers')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      setCompanyProfile(data || null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createCompanyProfile = async (profileData: {
    company_name: string
    description: string
    logo_url?: string
    website?: string
    country: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('company_providers')
        .insert([{
          user_id: user?.id,
          ...profileData,
          is_active: true
        }])
        .select()
        .single()

      if (error) throw error

      setCompanyProfile(data)
      return { success: true, data, error: null }
    } catch (err: any) {
      return { success: false, data: null, error: err.message }
    }
  }

  const updateCompanyProfile = async (updates: Partial<CompanyProfile>) => {
    try {
      const { data, error } = await supabase
        .from('company_providers')
        .update(updates)
        .eq('user_id', user?.id)
        .select()
        .single()

      if (error) throw error

      setCompanyProfile(data)
      return { success: true, data, error: null }
    } catch (err: any) {
      return { success: false, data: null, error: err.message }
    }
  }

  const uploadLogo = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`
      const filePath = `company-logos/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('company-logos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('company-logos')
        .getPublicUrl(filePath)

      return { success: true, url: data.publicUrl, error: null }
    } catch (err: any) {
      return { success: false, url: null, error: err.message }
    }
  }

  const hasCompletedProfile = !!companyProfile

  return {
    companyProfile,
    loading,
    error,
    refetch: fetchCompanyProfile,
    createCompanyProfile,
    updateCompanyProfile,
    uploadLogo,
    hasCompletedProfile,
  }
}
