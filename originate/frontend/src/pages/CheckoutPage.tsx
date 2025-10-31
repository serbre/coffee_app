import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../shared/contexts/CartContext'
import { useAuth } from '../shared/contexts/AuthContext'
import { useAddresses } from '../shared/hooks/useAddresses'
import { useOrders } from '../shared/hooks/useOrders'
import { useSupplierConnections } from '../shared/hooks/useSupplierConnections'
import { MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export const CheckoutPage = () => {
  const { items, total, clearCart } = useCart()
  const { user, profile } = useAuth()
  const { addresses, loading: addressesLoading } = useAddresses()
  const { createOrder } = useOrders()
  const { activeConnections } = useSupplierConnections()
  const navigate = useNavigate()

  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if not logged in or cart is empty
  if (!user) {
    navigate('/login?redirect=/checkout')
    return null
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  // Set default address if available
  if (addresses.length > 0 && !selectedAddressId) {
    const defaultAddress = addresses.find(a => a.is_default) || addresses[0]
    setSelectedAddressId(defaultAddress.id)
  }

  // Set default supplier if only one connection
  if (activeConnections.length === 1 && !selectedSupplierId) {
    setSelectedSupplierId(activeConnections[0].supplier_id)
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError('Please select a shipping address')
      return
    }

    if (!selectedSupplierId) {
      setError('Please select a supplier')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Find the selected supplier connection to get company_provider_id
      const connection = activeConnections.find(c => c.supplier_id === selectedSupplierId)
      if (!connection) {
        throw new Error('Invalid supplier connection')
      }

      // Create order
      const { success, order, error: orderError } = await createOrder({
        supplier_id: selectedSupplierId,
        company_provider_id: connection.company_provider_id,
        shipping_address_id: selectedAddressId,
        total_amount: total,
        notes,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price_at_purchase: item.price
        }))
      })

      if (!success || orderError) {
        throw new Error(orderError || 'Failed to create order')
      }

      // Clear cart and navigate to order confirmation
      clearCart()
      navigate(`/orders/${order?.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            <span className="text-accent-500">Checkout</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Review your order and complete your purchase
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Supplier */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-coffee-900 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <MapPinIcon className="h-6 w-6 text-accent-400" />
                <h2 className="text-2xl font-display font-bold">Shipping Address</h2>
              </div>

              {addressesLoading ? (
                <div className="text-gray-400">Loading addresses...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No addresses saved</p>
                  <a href="/profile/settings" className="btn-primary inline-block">
                    Add Address
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block bg-black/30 rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? 'border-accent-500'
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          {address.is_default && (
                            <span className="inline-block bg-accent-500/20 text-accent-400 text-xs px-3 py-1 rounded-full mb-2">
                              Default
                            </span>
                          )}
                          <p className="text-white font-medium">{address.street}</p>
                          <p className="text-gray-400 text-sm">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className="text-gray-400 text-sm">{address.country}</p>
                        </div>
                        {selectedAddressId === address.id && (
                          <CheckCircleIcon className="h-6 w-6 text-accent-400" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Select Supplier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-coffee-900 border border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-display font-bold mb-6">Select Supplier</h2>

              {activeConnections.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No supplier connections</p>
                  <a href="/suppliers" className="btn-primary inline-block">
                    Connect with Supplier
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeConnections.map((connection) => (
                    <label
                      key={connection.id}
                      className={`block bg-black/30 rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                        selectedSupplierId === connection.supplier_id
                          ? 'border-accent-500'
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="supplier"
                        value={connection.supplier_id}
                        checked={selectedSupplierId === connection.supplier_id}
                        onChange={() => setSelectedSupplierId(connection.supplier_id)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-semibold text-lg">
                            {connection.supplier?.business_name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {connection.supplier?.location_city}, {connection.supplier?.location_country}
                          </p>
                        </div>
                        {selectedSupplierId === connection.supplier_id && (
                          <CheckCircleIcon className="h-6 w-6 text-accent-400" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Order Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-coffee-900 border border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-display font-bold mb-6">Order Notes (Optional)</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any special instructions for your order..."
                rows={4}
                className="input-field w-full resize-none"
              />
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-coffee-900 border border-white/10 rounded-3xl p-8 sticky top-24"
            >
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white mt-4">
                  <span>Total</span>
                  <span className="text-accent-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={submitting || !selectedAddressId || !selectedSupplierId}
                className="btn-primary w-full"
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
