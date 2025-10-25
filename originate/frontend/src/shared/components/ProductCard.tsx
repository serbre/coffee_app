import { motion } from 'framer-motion'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Product } from '../types'
import { useCart } from '../contexts/CartContext'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart()

  const roastLevelColors = {
    light: 'text-accent-300',
    medium: 'text-accent-400',
    dark: 'text-accent-500'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-coffee-900 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-500/50 transition-all cursor-pointer shadow-xl"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-coffee-700 to-coffee-900 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-accent-400">
            {/* Placeholder coffee icon */}
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {product.category === 'exclusive' && (
          <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Exclusive
          </div>
        )}
        {product.category === 'seasonal' && (
          <div className="absolute top-2 right-2 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Seasonal
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-display font-bold text-white">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400">{product.origin}</p>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2">
          {product.description}
        </p>

        {/* Tasting Notes */}
        {product.tasting_notes && product.tasting_notes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tasting_notes.slice(0, 3).map((note, index) => (
              <span
                key={index}
                className="text-xs bg-accent-500/20 text-accent-300 px-2 py-1 rounded-full"
              >
                {note}
              </span>
            ))}
          </div>
        )}

        {/* Roast Level */}
        <div className="flex items-center justify-between text-sm">
          <span className={`font-semibold ${roastLevelColors[product.roast_level]}`}>
            {product.roast_level.charAt(0).toUpperCase() + product.roast_level.slice(1)} Roast
          </span>
          <span className="text-gray-400">
            {product.weight_grams}g
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="btn-primary flex items-center space-x-2"
            disabled={!product.is_available || product.stock_quantity === 0}
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>

        {/* Stock Status */}
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <p className="text-xs text-accent-400">
            Only {product.stock_quantity} left in stock
          </p>
        )}
        {product.stock_quantity === 0 && (
          <p className="text-xs text-red-400">
            Out of stock
          </p>
        )}
      </div>
    </motion.div>
  )
}
