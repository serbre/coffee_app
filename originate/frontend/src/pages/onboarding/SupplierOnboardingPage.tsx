import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSupplierProfile } from '../../shared/hooks/useSupplierProfile'
import { BuildingStorefrontIcon, MapPinIcon, TruckIcon } from '@heroicons/react/24/outline'

export const SupplierOnboardingPage = () => {
  const navigate = useNavigate()
  const { createSupplierProfile } = useSupplierProfile()

  const [formData, setFormData] = useState({
    business_name: '',
    description: '',
    location_city: '',
    location_state: '',
    location_country: 'Costa Rica',
    delivery_zones: [] as string[]
  })

  const [newZone, setNewZone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddZone = () => {
    if (newZone.trim() && !formData.delivery_zones.includes(newZone.trim())) {
      setFormData({
        ...formData,
        delivery_zones: [...formData.delivery_zones, newZone.trim()]
      })
      setNewZone('')
    }
  }

  const handleRemoveZone = (zone: string) => {
    setFormData({
      ...formData,
      delivery_zones: formData.delivery_zones.filter(z => z !== zone)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      if (formData.delivery_zones.length === 0) {
        throw new Error('Please add at least one delivery zone')
      }

      const { success, error } = await createSupplierProfile(formData)

      if (!success) {
        throw new Error(error || 'Failed to create supplier profile')
      }

      // Navigate to dashboard
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            Welcome to <span className="text-accent-500">Originate</span>
          </h1>
          <p className="text-xl text-gray-400">
            Let's set up your supplier profile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-coffee-900 border border-white/10 rounded-3xl p-8"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <BuildingStorefrontIcon className="h-6 w-6 text-accent-400" />
                <h2 className="text-2xl font-display font-bold">Business Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="Café Monteverde Roastery"
                    className="input-field w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell customers about your business, what makes your coffee special, and your story..."
                    rows={4}
                    className="input-field w-full resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed on your supplier profile
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <MapPinIcon className="h-6 w-6 text-accent-400" />
                <h2 className="text-2xl font-display font-bold">Location</h2>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.location_city}
                      onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                      placeholder="San José"
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      value={formData.location_state}
                      onChange={(e) => setFormData({ ...formData, location_state: e.target.value })}
                      placeholder="San José"
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.location_country}
                    onChange={(e) => setFormData({ ...formData, location_country: e.target.value })}
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Zones */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <TruckIcon className="h-6 w-6 text-accent-400" />
                <h2 className="text-2xl font-display font-bold">Delivery Zones</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Add Delivery Zones *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newZone}
                      onChange={(e) => setNewZone(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddZone())}
                      placeholder="Enter city or zone name"
                      className="input-field flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddZone}
                      className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-full transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Add all cities/zones where you can deliver coffee
                  </p>
                </div>

                {formData.delivery_zones.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Delivery Zones ({formData.delivery_zones.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.delivery_zones.map((zone) => (
                        <div
                          key={zone}
                          className="bg-accent-500/20 text-accent-300 px-4 py-2 rounded-full flex items-center space-x-2"
                        >
                          <span>{zone}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveZone(zone)}
                            className="text-accent-400 hover:text-accent-200 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-white/10">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-4 text-lg"
              >
                {submitting ? 'Creating Profile...' : 'Complete Setup'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
