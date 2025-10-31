import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCompanyProfile } from '../../shared/hooks/useCompanyProfile'
import { BuildingOffice2Icon, GlobeAltIcon } from '@heroicons/react/24/outline'

export const CompanyProviderOnboardingPage = () => {
  const navigate = useNavigate()
  const { createCompanyProfile } = useCompanyProfile()

  const [formData, setFormData] = useState({
    company_name: '',
    description: '',
    website: '',
    country: 'Costa Rica'
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const { success, error } = await createCompanyProfile(formData)

      if (!success) {
        throw new Error(error || 'Failed to create company profile')
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
            Let's set up your coffee company profile
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
            {/* Company Information */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <BuildingOffice2Icon className="h-6 w-6 text-accent-400" />
                <h2 className="text-2xl font-display font-bold">Company Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="Café Monteverde"
                    className="input-field w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Company Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your coffee company, your mission, values, and what makes your coffee unique..."
                    rows={6}
                    className="input-field w-full resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be displayed on your company profile and seen by suppliers and consumers
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="input-field w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Add your company website
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="input-field w-full"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-accent-500/10 border border-accent-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <GlobeAltIcon className="h-6 w-6 text-accent-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">What's Next?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    After completing your profile, you'll be able to:
                  </p>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>Add your coffee products to the catalog</li>
                    <li>Connect with local suppliers to distribute your coffee</li>
                    <li>Manage orders and track sales</li>
                    <li>Communicate with suppliers and consumers</li>
                  </ul>
                </div>
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
