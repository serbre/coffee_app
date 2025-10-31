import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useCompanyProfile } from './useCompanyProfile'
import type { Product } from '../types'

export const useCompanyProducts = () => {
  const { companyProfile } = useCompanyProfile()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (companyProfile) {
      fetchProducts()
    }
  }, [companyProfile])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('company_provider_id', companyProfile?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData: Omit<Product, 'id' | 'company_provider_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...productData,
          company_provider_id: companyProfile?.id
        }])
        .select()
        .single()

      if (error) throw error
      await fetchProducts()
      return { success: true, data, error: null }
    } catch (err: any) {
      return { success: false, data: null, error: err.message }
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .eq('company_provider_id', companyProfile?.id)
        .select()
        .single()

      if (error) throw error
      await fetchProducts()
      return { success: true, data, error: null }
    } catch (err: any) {
      return { success: false, data: null, error: err.message }
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('company_provider_id', companyProfile?.id)

      if (error) throw error
      await fetchProducts()
      return { success: true, error: null }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
