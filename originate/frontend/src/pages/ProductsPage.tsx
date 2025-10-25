import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '../shared/components/ProductCard'
import { useProducts } from '../shared/hooks/useProducts'

export const ProductsPage = () => {
  const { products, loading, error } = useProducts()
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [roastFilter, setRoastFilter] = useState<string>('all')

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesRoast = roastFilter === 'all' || product.roast_level === roastFilter
    return matchesCategory && matchesRoast
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-300 text-xl">Loading our finest coffees...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
          <p className="text-red-400 mb-4">Error loading products: {error}</p>
          <p className="text-gray-400">Please make sure your Supabase is configured correctly.</p>
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
            Our Collection
          </h1>
          <p className="text-gray-400 text-lg">
            Discover our carefully curated selection of specialty coffees
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Categories</option>
                <option value="single-origin">Single Origin</option>
                <option value="blend">Blend</option>
                <option value="seasonal">Seasonal</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </div>

            {/* Roast Filter */}
            <div className="flex-1">
              <label className="block text-gray-300 text-sm font-medium mb-2">Roast Level</label>
              <select
                value={roastFilter}
                onChange={(e) => setRoastFilter(e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Roast Levels</option>
                <option value="light">Light Roast</option>
                <option value="medium">Medium Roast</option>
                <option value="dark">Dark Roast</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-400 text-sm md:pt-6">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-coffee-900 border border-white/10 rounded-3xl p-6 shadow-2xl text-center py-12">
            <p className="text-gray-300 text-lg">
              No products match your filters. Try adjusting your selection.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
