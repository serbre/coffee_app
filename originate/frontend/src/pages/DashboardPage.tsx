import { useAuth } from '../shared/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { ConsumerDashboard } from './dashboards/ConsumerDashboard'
import { SupplierDashboard } from './dashboards/SupplierDashboard'
import { CompanyProviderDashboard } from './dashboards/CompanyProviderDashboard'

export const DashboardPage = () => {
  const { profile, loading, user } = useAuth()

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
