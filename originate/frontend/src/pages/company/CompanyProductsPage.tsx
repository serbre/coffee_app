import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCompanyProducts } from '../../shared/hooks/useCompanyProducts'
import { CubeIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export const CompanyProductsPage = () => {
  const { products, createProduct, updateProduct, deleteProduct } = useCompanyProducts()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    origin_country: '',
    roast_level: 'medium' as 'light' | 'medium' | 'dark',
    flavor_notes: '',
    image_url: '',
    is_available: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      flavor_notes: formData.flavor_notes.split(',').map(note => note.trim()).filter(Boolean)
    }

    if (editingProduct) {
      await updateProduct(editingProduct, productData)
      setEditingProduct(null)
    } else {
      await createProduct(productData)
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      origin_country: '',
      roast_level: 'medium',
      flavor_notes: '',
      image_url: '',
      is_available: true
    })
    setShowCreateForm(false)
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product.id)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      origin_country: product.origin_country || '',
      roast_level: product.roast_level || 'medium',
      flavor_notes: product.flavor_notes?.join(', ') || '',
      image_url: product.image_url || '',
      is_available: product.is_available
    })
    setShowCreateForm(true)
  }

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <h1 className="text-5xl font-display font-bold mb-4">
              Product <span className="text-accent-500">Catalog</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your coffee products
            </p>
          </div>
          <button
            onClick={() => {
              setShowCreateForm(!showCreateForm)
              setEditingProduct(null)
              setFormData({
                name: '',
                description: '',
                price: '',
                origin_country: '',
                roast_level: 'medium',
                flavor_notes: '',
                image_url: '',
                is_available: true
              })
            }}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </motion.div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-8 mb-8"
          >
            <h2 className="text-2xl font-display font-bold mb-6">
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder="e.g., Colombian Supreme"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder="19.99"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="Describe your coffee..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Origin Country
                  </label>
                  <input
                    type="text"
                    value={formData.origin_country}
                    onChange={(e) => setFormData({ ...formData, origin_country: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder="e.g., Colombia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Roast Level
                  </label>
                  <select
                    value={formData.roast_level}
                    onChange={(e) => setFormData({ ...formData, roast_level: e.target.value as any })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Flavor Notes (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.flavor_notes}
                  onChange={(e) => setFormData({ ...formData, flavor_notes: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="e.g., chocolate, caramel, nutty"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={formData.is_available}
                  onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-black/30 text-accent-500 focus:ring-2 focus:ring-accent-500"
                />
                <label htmlFor="is_available" className="text-sm font-medium text-gray-300">
                  Product is available for sale
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setEditingProduct(null)
                  }}
                  className="bg-black/30 hover:bg-black/50 text-gray-300 px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-coffee-900 border border-white/10 rounded-3xl p-12 text-center"
          >
            <CubeIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">
              No products yet
            </h2>
            <p className="text-gray-400 mb-6">
              Create your first product to get started
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-coffee-900 border border-white/10 rounded-3xl overflow-hidden hover:border-accent-500/30 transition-all"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-display font-bold text-white">
                      {product.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.is_available
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {product.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description || 'No description'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-accent-400 font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    {product.origin_country && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Origin:</span>
                        <span className="text-white">{product.origin_country}</span>
                      </div>
                    )}
                    {product.roast_level && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Roast:</span>
                        <span className="text-white capitalize">{product.roast_level}</span>
                      </div>
                    )}
                  </div>

                  {product.flavor_notes && product.flavor_notes.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.flavor_notes.slice(0, 3).map((note, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-accent-500/20 text-accent-400 rounded-full">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
