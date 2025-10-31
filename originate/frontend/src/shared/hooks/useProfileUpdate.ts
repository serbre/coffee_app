import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useProfileUpdate = () => {
  const { profile, fetchProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = async (updates: {
    full_name?: string
    phone?: string
    avatar_url?: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id)

      if (error) throw error

      // Refresh profile data
      await fetchProfile()
      return { success: true, error: null }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const uploadAvatar = async (file: File) => {
    try {
      setLoading(true)
      setError(null)

      const fileExt = file.name.split('.').pop()
      const fileName = `${profile?.id}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: data.publicUrl })

      return { success: true, error: null, url: data.publicUrl }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message, url: null }
    } finally {
      setLoading(false)
    }
  }

  return {
    updateProfile,
    uploadAvatar,
    loading,
    error,
  }
}
