import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSuppliers } from '../shared/hooks/useSuppliers'
import { useSupplierConnections } from '../shared/hooks/useSupplierConnections'
import { useAuth } from '../shared/contexts/AuthContext'
import { MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export const SuppliersPage = () => {
  const { suppliers, loading, error } = useSuppliers()
  const { user, profile } = useAuth()
  const {
    connectWithSupplier,
    disconnectFromSupplier,
    reconnectWithSupplier,
    isConnectedToSupplier,
    connections
  } = useSupplierConnections()
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [connectingSupplier, setConnectingSupplier] = useState<string | null>(null)

  const filteredSuppliers = suppliers.filter(supplier => {
    if (locationFilter === 'all') return true
    return supplier.location_city === locationFilter
  })

  const uniqueCities = Array.from(new Set(suppliers.map(s => s.location_city)))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-300 text-xl">Loading suppliers...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
          <p className="text-red-400 mb-4">Error loading suppliers: {error}</p>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold text-white mb-4">
            Our Suppliers
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with local coffee suppliers bringing exceptional beans from farm to cup
          </p>
        </motion.div>

        {/* Filters */}
        {uniqueCities.length > 1 && (
          <div className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex-1">
                <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="all">All Locations</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="text-gray-400 text-sm md:pt-6">
                {filteredSuppliers.length} {filteredSuppliers.length === 1 ? 'supplier' : 'suppliers'}
              </div>
            </div>
          </div>
        )}

        {/* Suppliers Grid */}
        {filteredSuppliers.length === 0 ? (
          <div className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl text-center py-12">
            <p className="text-gray-300 text-lg">
              No suppliers found in this location.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredSuppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-coffee-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-accent-500/50 transition-all"
              >
                {/* Logo Section - White background for transparent logo with black text */}
                {supplier.business_name.includes('Monteverde') && (
                  <div className="bg-white px-8 py-6 flex items-center justify-center">
                    <img
                      src="/assets/logo_cafe_monteverde.webp"
                      alt="Café Monteverde"
                      className="h-32 w-auto"
                    />
                  </div>
                )}

                {/* Supplier Header */}
                <div className="p-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    {supplier.business_name.includes('Monteverde')
                      ? 'Café Monteverde'
                      : supplier.business_name
                    }
                  </h3>

                  {/* Inspiring Description for Café Monteverde */}
                  {supplier.business_name.includes('Monteverde') ? (
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-200 leading-relaxed font-medium">
                        ☕ <span className="text-accent-400">A Legacy Since 1989</span>
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Born in the mystical cloud forests of Costa Rica, Café Monteverde is more than coffee—it's a story of <span className="text-white font-semibold">21 families</span> united by passion, tradition, and a commitment to the land.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        From <span className="text-accent-400">seed to cup</span>, every bean tells the story of sustainable farming, artisan roasting, and a deep respect for nature. Our three distinctive processes—<span className="text-white">Fully Washed, Honey, and Natural</span>—each unlock unique flavors that celebrate the terroir of Monteverde.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        🌱 Visit us for <span className="text-white font-semibold">farm tours</span>, coffee tastings, and birdwatching adventures that connect you to the origin of your morning cup.
                      </p>
                      <div className="bg-accent-500/10 border border-accent-500/30 rounded-xl p-4 mt-4">
                        <p className="text-accent-300 text-sm font-medium">
                          📍 Open Monday-Sunday, 8am-5pm | 📧 info@cafedemonteverde.com
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {supplier.description}
                    </p>
                  )}

                  {/* Location */}
                  <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Location</div>
                      <div className="text-gray-400 text-sm">
                        {supplier.business_name.includes('Monteverde')
                          ? 'Monteverde, Costa Rica'
                          : `${supplier.location_city}, ${supplier.location_state && `${supplier.location_state}, `}${supplier.location_country}`
                        }
                      </div>
                    </div>
                  </div>

                  {/* Delivery Zones */}
                  {supplier.delivery_zones && supplier.delivery_zones.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-medium">Delivery Zones</div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {supplier.delivery_zones.map((zone, i) => (
                            <span
                              key={i}
                              className="text-xs bg-accent-500/20 text-accent-300 px-3 py-1 rounded-full"
                            >
                              {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    {user && profile?.role === 'consumer' ? (
                      isConnectedToSupplier(supplier.id) ? (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircleIcon className="h-5 w-5" />
                          <span className="font-semibold">Connected</span>
                        </div>
                      ) : (
                        <button
                          onClick={async () => {
                            setConnectingSupplier(supplier.id)
                            const companyProviderId = supplier.supplier_company_relationships?.[0]?.company_provider_id
                            if (companyProviderId) {
                              await connectWithSupplier(supplier.id, companyProviderId)
                            }
                            setConnectingSupplier(null)
                          }}
                          disabled={connectingSupplier === supplier.id}
                          className="btn-primary"
                        >
                          {connectingSupplier === supplier.id ? 'Connecting...' : 'Connect with Supplier'}
                        </button>
                      )
                    ) : (
                      <a href="/login" className="btn-primary">
                        Sign in to Connect
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
