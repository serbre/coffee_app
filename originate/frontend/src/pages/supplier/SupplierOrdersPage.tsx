import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSupplierOrders } from '../../shared/hooks/useSupplierOrders'
import { ShoppingBagIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export const SupplierOrdersPage = () => {
  const { orders, pendingOrders, updateOrderStatus } = useSupplierOrders()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true
    return order.status === statusFilter
  })

  const handleStatusUpdate = async (orderId: string, newStatus: any) => {
    setUpdatingOrder(orderId)
    await updateOrderStatus(orderId, newStatus)
    setUpdatingOrder(null)
  }

  const getNextStatus = (currentStatus: string) => {
    const flow = {
      'pending': 'confirmed',
      'confirmed': 'preparing',
      'preparing': 'shipped',
      'shipped': 'delivered'
    }
    return flow[currentStatus as keyof typeof flow]
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
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
            Order <span className="text-accent-500">Management</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage and fulfill customer orders
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-6"
          >
            <div className="text-2xl font-bold text-white mb-1">{orders.length}</div>
            <div className="text-sm text-gray-400">Total Orders</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-coffee-900 border border-yellow-500/20 rounded-3xl p-6"
          >
            <div className="text-2xl font-bold text-yellow-400 mb-1">{pendingOrders.length}</div>
            <div className="text-sm text-gray-400">Pending</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-coffee-900 border border-blue-500/20 rounded-3xl p-6"
          >
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {orders.filter(o => ['confirmed', 'preparing'].includes(o.status)).length}
            </div>
            <div className="text-sm text-gray-400">In Progress</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-coffee-900 border border-green-500/20 rounded-3xl p-6"
          >
            <div className="text-2xl font-bold text-green-400 mb-1">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-400">Delivered</div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                {getStatusLabel(status)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-12 text-center"
          >
            <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">
              {statusFilter === 'all' ? 'No orders yet' : `No ${statusFilter} orders`}
            </h2>
            <p className="text-gray-400">
              {statusFilter === 'all'
                ? 'Orders will appear here once consumers place them'
                : 'Try adjusting your filter'
              }
            </p>
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
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'preparing' ? 'bg-purple-500/20 text-purple-400' :
                        order.status === 'shipped' ? 'bg-cyan-500/20 text-cyan-400' :
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">
                      Customer: {order.consumer?.full_name || 'Unknown'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-accent-400 mb-3">
                      ${order.total_amount.toFixed(2)}
                    </div>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status))}
                        disabled={updatingOrder === order.id}
                        className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {updatingOrder === order.id ? 'Updating...' : `Mark as ${getStatusLabel(getNextStatus(order.status))}`}
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <div className="flex items-center justify-end space-x-2 text-green-400">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span className="text-sm font-semibold">Completed</span>
                      </div>
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
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <p className="text-white font-medium text-sm">{item.product?.name}</p>
                            <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-white font-medium text-sm">
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
