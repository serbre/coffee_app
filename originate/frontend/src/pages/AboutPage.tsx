import { motion } from 'framer-motion'
import { HeartIcon, GlobeAltIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline'

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/coffee-farm.jpg"
            alt="Coffee farm"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              About <span className="text-accent-500">Originate</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Connecting coffee lovers with the artisans who grow, roast, and perfect every bean—from seed to cup.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto text-center">
            At Originate, we believe every cup of coffee tells a story. Our mission is to create a transparent marketplace that celebrates the journey from farm to cup, empowering small-scale coffee producers and connecting them directly with conscious consumers who value quality, sustainability, and authenticity.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: HeartIcon,
              title: 'Passion',
              description: 'We celebrate the artistry and dedication of coffee producers who pour their hearts into every harvest.'
            },
            {
              icon: GlobeAltIcon,
              title: 'Sustainability',
              description: 'Supporting environmentally responsible farming practices that protect our planet for future generations.'
            },
            {
              icon: ShieldCheckIcon,
              title: 'Transparency',
              description: 'Full traceability from origin to cup, ensuring you know exactly where your coffee comes from.'
            },
            {
              icon: UsersIcon,
              title: 'Community',
              description: 'Building lasting relationships between growers, roasters, and coffee enthusiasts worldwide.'
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-coffee-900 border border-white/10 rounded-3xl p-8 hover:border-accent-500/50 transition-all"
            >
              <value.icon className="h-12 w-12 text-accent-400 mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3 text-white">
                {value.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-coffee-900 border border-white/10 rounded-3xl p-12 mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Originate was born from a simple observation: the disconnect between coffee drinkers and the incredible people who make their morning ritual possible.
                </p>
                <p>
                  We saw farmers with exceptional beans struggling to reach conscious consumers. We saw coffee lovers craving transparency and connection to origin. We saw an opportunity to build something better.
                </p>
                <p>
                  Today, Originate serves as a bridge—a platform where quality meets purpose, where every purchase supports sustainable livelihoods, and where the story behind your coffee is as rich as its flavor.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="/assets/coffee-workers.jpg"
                alt="Coffee workers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Making an Impact
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
            By choosing Originate, you're not just buying coffee—you're supporting a movement towards ethical sourcing, fair compensation, and environmental stewardship.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '21+', label: 'Family Farms Supported' },
              { number: '100%', label: 'Direct Trade Relationships' },
              { number: '3', label: 'Countries & Growing' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/30 rounded-3xl p-8"
              >
                <div className="text-5xl md:text-6xl font-display font-bold text-accent-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Join the Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience coffee the way it was meant to be—with purpose, transparency, and exceptional quality.
            </p>
            <a
              href="/products"
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-10 rounded-full transition-all duration-200 text-lg"
            >
              Explore Our Coffee
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
