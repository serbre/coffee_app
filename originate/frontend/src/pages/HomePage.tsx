import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Farm Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/coffee-farm.jpg"
            alt="Coffee farm"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-accent-400 font-semibold tracking-wider uppercase mb-4"
          >
            From Farm to Cup
          </motion.p>
          <h1 className="text-7xl md:text-9xl font-display font-bold text-white mb-6 tracking-tight">
            Originate
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with local coffee suppliers and discover exceptional beans from farms around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/products" className="btn-primary flex items-center justify-center space-x-2 group">
              <span>Explore Coffee</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-outline">
              Become a Supplier
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Farm to Cup Journey */}
      <section className="py-32 px-4 bg-gradient-to-b from-black to-coffee-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Your Coffee Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the complete story from sustainable farms to your morning cup
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/coffee-workers.jpg"
                alt="Coffee workers harvesting"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block bg-accent-500/10 text-accent-400 px-4 py-2 rounded-full text-sm font-semibold">
                Step 1: The Farm
              </div>
              <h3 className="text-4xl font-display font-bold text-white">
                Sustainable Sourcing
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our partnered farms practice ethical and sustainable cultivation methods, ensuring the highest quality beans while supporting local communities and preserving the environment.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span className="text-gray-300">Direct trade with coffee farmers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span className="text-gray-300">Organic and sustainable farming practices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span className="text-gray-300">Fair compensation for growers</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:order-2"
            >
              <div className="inline-block bg-accent-500/10 text-accent-400 px-4 py-2 rounded-full text-sm font-semibold">
                Step 2: Local Suppliers
              </div>
              <h3 className="text-4xl font-display font-bold text-white">
                Trusted Partners
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Connect with verified local suppliers who roast fresh, deliver fast, and bring the world's finest coffee directly to your neighborhood.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span className="text-gray-300">Freshly roasted to order</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span className="text-gray-300">Expert roasters you can trust</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 mt-1">✓</span>
                  <span className="text-gray-300">Fast local delivery</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:order-1"
            >
              <img
                src="/assets/coffee-journey.png"
                alt="Coffee journey"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-coffee-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Every batch is carefully selected and quality-tested to ensure exceptional flavor in every cup
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                Local Connection
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Support your community by purchasing from local suppliers who care about quality and service
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="text-accent-500 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                Fair Pricing
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Transparent pricing that ensures farmers and suppliers receive fair compensation for their work
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-coffee-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Discover Your Perfect Coffee?
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            Join our marketplace and connect with local suppliers bringing exceptional coffee from farms to your cup
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/products" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Start Shopping</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link to="/login" className="btn-outline">
              Become a Supplier
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
