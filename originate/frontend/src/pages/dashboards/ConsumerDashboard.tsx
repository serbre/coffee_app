import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../shared/contexts/AuthContext'
import { useOrders } from '../../shared/hooks/useOrders'
import { useSupplierConnections } from '../../shared/hooks/useSupplierConnections'
import { ShoppingBagIcon, TruckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export const ConsumerDashboard = () => {
  const { profile } = useAuth()
  const { orders } = useOrders()
  const { activeConnections } = useSupplierConnections()

  const activeOrders = orders.filter(o => ['pending', 'confirmed', 'preparing', 'shipped'].includes(o.status))

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
            Welcome back, {profile?.full_name}!
          </h1>
          <p className="text-gray-400 text-lg">
            Your Coffee Journey
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
                <ShoppingBagIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{activeOrders.length}</div>
                <div className="text-sm text-gray-400">Active Orders</div>
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
                <TruckIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{activeConnections.length}</div>
                <div className="text-sm text-gray-400">Suppliers</div>
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
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-accent-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Messages</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Get Started */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Get Started
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="text-white font-semibold">Find Local Suppliers</div>
                  <div className="text-sm text-gray-400">Browse suppliers in your area</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="text-white font-semibold">Connect with a Supplier</div>
                  <div className="text-sm text-gray-400">Establish a direct relationship</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-accent-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="text-white font-semibold">Order Fresh Coffee</div>
                  <div className="text-sm text-gray-400">Get coffee delivered to your door</div>
                </div>
              </div>
            </div>
            <Link to="/suppliers" className="btn-primary w-full mt-6 text-center block">
              Browse Suppliers
            </Link>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Recent Activity
            </h2>
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <ShoppingBagIcon className="h-16 w-16 mx-auto opacity-30" />
              </div>
              <p className="text-gray-400">No recent activity yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Start by connecting with a supplier
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
