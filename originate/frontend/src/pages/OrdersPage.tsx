import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOrders } from '../shared/hooks/useOrders'
import { useAuth } from '../shared/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { ShoppingBagIcon, TruckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export const OrdersPage = () => {
  const { user } = useAuth()
  const { orders, loading, cancelOrder } = useOrders()
  const [statusFilter, setStatusFilter] = useState<string>('all')

  if (!user) {
    return <Navigate to="/login?redirect=/orders" replace />
  }

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true
    return order.status === statusFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400'
      case 'confirmed': return 'text-blue-400'
      case 'preparing': return 'text-purple-400'
      case 'shipped': return 'text-cyan-400'
      case 'delivered': return 'text-green-400'
      case 'cancelled': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircleIcon className="h-5 w-5" />
      case 'cancelled': return <XCircleIcon className="h-5 w-5" />
      case 'shipped': return <TruckIcon className="h-5 w-5" />
      default: return <ShoppingBagIcon className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            Your <span className="text-accent-500">Orders</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Track and manage your coffee orders
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-coffee-900 border border-white/10 rounded-3xl p-6 mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {['all', 'pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-accent-500 text-white'
                    : 'bg-black/30 text-gray-400 hover:text-white hover:bg-black/50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl">Loading your orders...</div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-12 text-center"
          >
            <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">
              {statusFilter === 'all' ? 'No orders yet' : `No ${statusFilter} orders`}
            </h2>
            <p className="text-gray-400 mb-6">
              {statusFilter === 'all'
                ? 'Start shopping to place your first order'
                : 'Try adjusting your filter to see more orders'
              }
            </p>
            {statusFilter === 'all' && (
              <a href="/products" className="btn-primary inline-block">
                Browse Products
              </a>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-coffee-900 border border-white/10 rounded-3xl p-8 hover:border-accent-500/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-display font-bold">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <div className={`flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-semibold capitalize">{order.status}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Supplier: {order.supplier?.business_name}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-accent-400">
                      ${order.total_amount.toFixed(2)}
                    </div>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="text-sm text-red-400 hover:text-red-300 mt-2 transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">Items</h4>
                  <div className="space-y-3">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {item.product?.image_url && (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <p className="text-white font-medium">{item.product?.name}</p>
                            <p className="text-gray-400 text-sm">
                              {item.product?.roast_level && `${item.product.roast_level} • `}
                              {item.product?.origin}
                            </p>
                            <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-white font-medium">
                          ${(item.price_at_purchase * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shipping_address && (
                  <div className="border-t border-white/10 pt-6 mt-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Shipping Address</h4>
                    <p className="text-gray-300 text-sm">
                      {order.shipping_address.street}<br />
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}<br />
                      {order.shipping_address.country}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {order.notes && (
                  <div className="border-t border-white/10 pt-6 mt-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Order Notes</h4>
                    <p className="text-gray-300 text-sm">{order.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
