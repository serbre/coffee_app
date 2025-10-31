import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../shared/contexts/AuthContext'
import { useCompanyProfile } from '../../shared/hooks/useCompanyProfile'
import { useCompanyProducts } from '../../shared/hooks/useCompanyProducts'
import { useCompanySuppliers } from '../../shared/hooks/useCompanySuppliers'
import { UsersIcon, CubeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export const CompanyProviderDashboard = () => {
  const { profile } = useAuth()
  const { companyProfile } = useCompanyProfile()
  const { products } = useCompanyProducts()
  const { approvedSuppliers, pendingSuppliers, approveSupplier, rejectSupplier } = useCompanySuppliers()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Welcome, {profile?.full_name}!
          </h1>
          <p className="text-gray-400 text-lg">
            Company Provider Dashboard
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent-500/20 p-3 rounded-xl">
                <UsersIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{approvedSuppliers.length}</div>
                <div className="text-sm text-gray-400">Active Suppliers</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent-500/20 p-3 rounded-xl">
                <CubeIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{products.length}</div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent-500/20 p-3 rounded-xl">
                <ChartBarIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-sm text-gray-400">Total Sales</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Getting Started
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className={`${companyProfile ? 'bg-green-500' : 'bg-accent-500'} text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {companyProfile ? '✓' : '1'}
                </div>
                <div>
                  <div className="text-white font-semibold">Create Company Profile</div>
                  <div className="text-sm text-gray-400">
                    {companyProfile ? 'Profile complete!' : 'Set up your company information'}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className={`${products.length > 0 ? 'bg-green-500' : 'bg-accent-500'} text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {products.length > 0 ? '✓' : '2'}
                </div>
                <div>
                  <div className="text-white font-semibold">Add Your Products</div>
                  <div className="text-sm text-gray-400">
                    {products.length > 0 ? `${products.length} products added` : 'Create your coffee catalog'}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className={`${approvedSuppliers.length > 0 ? 'bg-green-500' : 'bg-accent-500'} text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                  {approvedSuppliers.length > 0 ? '✓' : '3'}
                </div>
                <div>
                  <div className="text-white font-semibold">Approve Suppliers</div>
                  <div className="text-sm text-gray-400">
                    {approvedSuppliers.length > 0 ? `${approvedSuppliers.length} suppliers approved` : 'Review and approve supplier applications'}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/company/products">
              <button className="btn-primary w-full mt-6">
                {products.length > 0 ? 'Manage Products' : 'Add Products'}
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Pending Supplier Applications
            </h2>
            {pendingSuppliers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-600 mb-4">
                  <UsersIcon className="h-16 w-16 mx-auto opacity-30" />
                </div>
                <p className="text-gray-400">No pending applications</p>
                <p className="text-sm text-gray-500 mt-2">
                  Supplier applications will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingSuppliers.slice(0, 3).map((relationship) => (
                  <div key={relationship.id} className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">
                        {relationship.supplier?.business_name || 'Unknown Supplier'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {relationship.supplier?.location_city}, {relationship.supplier?.location_state}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => approveSupplier(relationship.id)}
                        className="flex-1 bg-accent-500 hover:bg-accent-600 text-white text-sm py-2 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectSupplier(relationship.id)}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm py-2 rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {pendingSuppliers.length > 3 && (
                  <button className="w-full text-accent-400 hover:text-accent-300 text-sm py-2">
                    View all {pendingSuppliers.length} applications
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
