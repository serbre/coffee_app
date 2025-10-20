import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-900/80 via-coffee-800/80 to-green-mountain-900/80" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold text-coffee-50 mb-6">
            Originate
          </h1>
          <p className="text-xl md:text-2xl text-coffee-200 mb-8">
            Discover exceptional coffee from premium roasters worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary flex items-center justify-center space-x-2">
              <span>Shop Our Collection</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link to="/subscriptions" className="btn-secondary">
              Subscribe & Save
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-coffee-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-coffee-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-coffee-50 mb-4">
              Why Originate?
            </h2>
            <p className="text-coffee-200 text-lg">
              Connect directly with the world's finest specialty coffee roasters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card text-center"
            >
              <div className="text-green-mountain-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-coffee-50 mb-2">
                Curated Selection
              </h3>
              <p className="text-coffee-200">
                Carefully vetted roasters offering the finest single-origin and specialty blends
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card text-center"
            >
              <div className="text-green-mountain-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-coffee-50 mb-2">
                Direct from Roasters
              </h3>
              <p className="text-coffee-200">
                Fresh coffee shipped directly from roasters to your door, ensuring peak flavor
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card text-center"
            >
              <div className="text-green-mountain-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-coffee-50 mb-2">
                Support Artisan Roasters
              </h3>
              <p className="text-coffee-200">
                Every purchase directly supports independent roasters and sustainable practices
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-coffee-50 mb-4">
            Ready to Discover Your Perfect Coffee?
          </h2>
          <p className="text-coffee-200 text-lg mb-8">
            Join our marketplace and explore exceptional coffee from premium roasters worldwide
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
            <span>Start Shopping</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
