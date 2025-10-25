import { motion } from 'framer-motion'
import { useAuth } from '../../shared/contexts/AuthContext'
import { UsersIcon, CubeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export const CompanyProviderDashboard = () => {
  const { profile } = useAuth()

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
                <div className="text-2xl font-bold text-white">0</div>
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
                <div className="text-2xl font-bold text-white">0</div>
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
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="text-white font-semibold">Create Company Profile</div>
                  <div className="text-sm text-gray-400">Set up your company information</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="text-white font-semibold">Add Your Products</div>
                  <div className="text-sm text-gray-400">Create your coffee catalog</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="text-white font-semibold">Approve Suppliers</div>
                  <div className="text-sm text-gray-400">Review and approve supplier applications</div>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mt-6">
              Setup Company
            </button>
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
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <UsersIcon className="h-16 w-16 mx-auto opacity-30" />
              </div>
              <p className="text-gray-400">No pending applications</p>
              <p className="text-sm text-gray-500 mt-2">
                Supplier applications will appear here
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
