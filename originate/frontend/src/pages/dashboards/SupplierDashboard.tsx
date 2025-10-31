import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../shared/contexts/AuthContext'
import { useSupplierProfile } from '../../shared/hooks/useSupplierProfile'
import { useSupplierOrders } from '../../shared/hooks/useSupplierOrders'
import { useSupplierConsumers } from '../../shared/hooks/useSupplierConsumers'
import { UsersIcon, ShoppingBagIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline'

export const SupplierDashboard = () => {
  const { profile } = useAuth()
  const { supplierProfile } = useSupplierProfile()
  const { pendingOrders, activeOrders, orders } = useSupplierOrders()
  const { activeConsumers } = useSupplierConsumers()

  const recentOrders = orders.slice(0, 5)

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
            Supplier Dashboard
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
                <div className="text-2xl font-bold text-white">{activeConsumers.length}</div>
                <div className="text-sm text-gray-400">Active Consumers</div>
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
                <ShoppingBagIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{pendingOrders.length}</div>
                <div className="text-sm text-gray-400">Pending Orders</div>
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
                <BuildingStorefrontIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Companies</div>
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
                  <div className="text-white font-semibold">Complete Your Profile</div>
                  <div className="text-sm text-gray-400">Set up business name and delivery zones</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="text-white font-semibold">Apply to Companies</div>
                  <div className="text-sm text-gray-400">Request to represent coffee companies</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="text-white font-semibold">Manage Inventory</div>
                  <div className="text-sm text-gray-400">Add products to your inventory</div>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mt-6">
              Complete Setup
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-white">
                Recent Orders
              </h2>
              {orders.length > 0 && (
                <Link to="/supplier/orders" className="text-accent-400 hover:text-accent-300 text-sm">
                  View All
                </Link>
              )}
            </div>
            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-600 mb-4">
                  <ShoppingBagIcon className="h-16 w-16 mx-auto opacity-30" />
                </div>
                <p className="text-gray-400">No orders yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Orders will appear here once consumers connect with you
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Order #{order.id.slice(0, 8)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'shipped' ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">${order.total_amount.toFixed(2)} • {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
