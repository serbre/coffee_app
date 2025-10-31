import { motion } from 'framer-motion'
import { CalendarIcon, CheckCircleIcon, BoltIcon } from '@heroicons/react/24/outline'

export const SubscriptionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Coffee <span className="text-accent-500">Subscriptions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Never run out of your favorite coffee. Subscribe and save with flexible delivery options.
          </p>
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/30 rounded-3xl p-8 mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-2 bg-accent-500/20 text-accent-400 px-6 py-2 rounded-full mb-4">
            <CalendarIcon className="h-5 w-5" />
            <span className="font-semibold">Coming Soon</span>
          </div>
          <p className="text-gray-300 text-lg">
            We're brewing something special! Subscription features are currently in development.
          </p>
        </motion.div>

        {/* Implementation Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Option A: Simple */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircleIcon className="h-8 w-8 text-accent-400" />
              <h2 className="text-3xl font-display font-bold text-white">
                Option A: Simple
              </h2>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Manual subscription management for users who prefer control and simplicity.
            </p>

            <div className="space-y-3">
              <h3 className="text-white font-semibold mb-3">Features:</h3>
              {[
                'User-initiated subscription management',
                'Manual order creation on delivery dates',
                'Simple calendar view of next delivery',
                'Basic pause/resume/cancel controls',
                'Choose frequency (weekly, bi-weekly, monthly)',
                'Select product and quantity',
                'Email reminders before delivery'
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="text-accent-400 mt-1">•</div>
                  <p className="text-gray-400">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-500">
                <strong className="text-accent-400">Best for:</strong> Getting started quickly, simple workflow, manual control
              </p>
            </div>
          </motion.div>

          {/* Option B: Advanced */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-coffee-900 border border-accent-500/30 rounded-3xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <BoltIcon className="h-8 w-8 text-accent-400" />
              <h2 className="text-3xl font-display font-bold text-white">
                Option B: Advanced
              </h2>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Fully automated subscription system with smart features and predictive analytics.
            </p>

            <div className="space-y-3">
              <h3 className="text-white font-semibold mb-3">Features:</h3>
              {[
                'Automated order creation via cron jobs',
                'Email & SMS notifications before delivery',
                'Smart recommendations based on history',
                'Rating system for preference learning',
                'Auto-adjust frequency based on consumption',
                'Gift subscription support',
                'Subscription tiers (Explorer, Enthusiast, Connoisseur)',
                'Member-only benefits and exclusive access',
                'Integration with inventory management',
                'Analytics dashboard for suppliers'
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="text-accent-400 mt-1">✦</div>
                  <p className="text-gray-400">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-accent-500/20">
              <p className="text-sm text-gray-500">
                <strong className="text-accent-400">Best for:</strong> Premium experience, automation, long-term engagement
              </p>
            </div>
          </motion.div>
        </div>

        {/* Planned Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-coffee-900 border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            What to Expect
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-accent-400 text-2xl mb-3">☕</div>
              <h3 className="text-xl font-semibold text-white mb-2">Flexible Plans</h3>
              <p className="text-gray-400">
                Choose from weekly, bi-weekly, or monthly deliveries. Pause, skip, or cancel anytime with no commitments.
              </p>
            </div>

            <div>
              <div className="text-accent-400 text-2xl mb-3">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">Save Money</h3>
              <p className="text-gray-400">
                Get 10-15% off retail prices with subscription discounts. Plus free shipping on all deliveries.
              </p>
            </div>

            <div>
              <div className="text-accent-400 text-2xl mb-3">🎁</div>
              <h3 className="text-xl font-semibold text-white mb-2">Special Perks</h3>
              <p className="text-gray-400">
                Priority access to limited releases, exclusive farm tours, and members-only tasting events.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Want to be notified when subscriptions launch?
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-200 text-lg">
            Join the Waitlist
          </button>
        </motion.div>
      </div>
    </div>
  )
}
