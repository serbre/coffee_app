import { useAuth } from '../shared/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { ConsumerDashboard } from './dashboards/ConsumerDashboard'
import { SupplierDashboard } from './dashboards/SupplierDashboard'
import { CompanyProviderDashboard } from './dashboards/CompanyProviderDashboard'
import { useSupplierProfile } from '../shared/hooks/useSupplierProfile'
import { useCompanyProfile } from '../shared/hooks/useCompanyProfile'

export const DashboardPage = () => {
  const { profile, loading, user } = useAuth()
  const { supplierProfile, loading: supplierLoading } = useSupplierProfile()
  const { companyProfile, loading: companyLoading } = useCompanyProfile()

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card text-center">
          <div className="animate-pulse mb-4">
            <div className="text-4xl">☕</div>
          </div>
          <div className="text-coffee-200 text-xl">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login?redirect=/dashboard" replace />
  }

  // Show loading if user exists but profile hasn't loaded yet
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card text-center">
          <div className="animate-pulse mb-4">
            <div className="text-4xl">☕</div>
          </div>
          <div className="text-coffee-200 text-xl">Setting up your profile...</div>
        </div>
      </div>
    )
  }

  // Check if supplier/company needs to complete onboarding
  if (profile.role === 'supplier') {
    if (supplierLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="glass-card text-center">
            <div className="animate-pulse mb-4">
              <div className="text-4xl">☕</div>
            </div>
            <div className="text-coffee-200 text-xl">Loading...</div>
          </div>
        </div>
      )
    }
    if (!supplierProfile) {
      return <Navigate to="/onboarding/supplier" replace />
    }
  }

  if (profile.role === 'company_provider') {
    if (companyLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="glass-card text-center">
            <div className="animate-pulse mb-4">
              <div className="text-4xl">☕</div>
            </div>
            <div className="text-coffee-200 text-xl">Loading...</div>
          </div>
        </div>
      )
    }
    if (!companyProfile) {
      return <Navigate to="/onboarding/company" replace />
    }
  }

  // Route to appropriate dashboard based on role
  switch (profile.role) {
    case 'consumer':
      return <ConsumerDashboard />
    case 'supplier':
      return <SupplierDashboard />
    case 'company_provider':
      return <CompanyProviderDashboard />
    default:
      return <Navigate to="/" replace />
  }
}
