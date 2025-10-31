import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../shared/contexts/AuthContext'
import { useProfileUpdate } from '../shared/hooks/useProfileUpdate'
import { useAddresses } from '../shared/hooks/useAddresses'
import { UserIcon, MapPinIcon, PlusIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Address } from '../shared/hooks/useAddresses'

export const ProfileSettingsPage = () => {
  const { profile } = useAuth()
  const { updateProfile, loading: profileLoading } = useProfileUpdate()
  const {
    addresses,
    loading: addressesLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses()

  // Profile form state
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [profileSuccess, setProfileSuccess] = useState(false)

  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Costa Rica',
    is_default: false,
  })

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success } = await updateProfile({ full_name: fullName, phone })
    if (success) {
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddress) {
      await updateAddress(editingAddress.id, addressForm)
    } else {
      await addAddress(addressForm)
    }

    // Reset form
    setAddressForm({
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'Costa Rica',
      is_default: false,
    })
    setShowAddressForm(false)
    setEditingAddress(null)
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setAddressForm({
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    })
    setShowAddressForm(true)
  }

  const handleCancelAddressForm = () => {
    setShowAddressForm(false)
    setEditingAddress(null)
    setAddressForm({
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'Costa Rica',
      is_default: false,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            Profile <span className="text-accent-500">Settings</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-coffee-900 border border-white/10 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <UserIcon className="h-6 w-6 text-accent-400" />
            <h2 className="text-2xl font-display font-bold">Personal Information</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                className="input-field w-full bg-black/30 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+506 1234-5678"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Role
              </label>
              <input
                type="text"
                value={profile?.role || ''}
                disabled
                className="input-field w-full bg-black/30 cursor-not-allowed capitalize"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={profileLoading}
                className="btn-primary"
              >
                {profileLoading ? 'Saving...' : 'Save Changes'}
              </button>

              {profileSuccess && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Profile updated!</span>
                </div>
              )}
            </div>
          </form>
        </motion.div>

        {/* Shipping Addresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-coffee-900 border border-white/10 rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-6 w-6 text-accent-400" />
              <h2 className="text-2xl font-display font-bold">Shipping Addresses</h2>
            </div>
            {!showAddressForm && (
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Address</span>
              </button>
            )}
          </div>

          {/* Address Form */}
          {showAddressForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-black/30 rounded-2xl p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingAddress ? 'Edit Address' : 'New Address'}
              </h3>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    className="input-field w-full"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={addressForm.postal_code}
                      onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={addressForm.country}
                      onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={addressForm.is_default}
                    onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                    className="rounded border-gray-600 text-accent-500 focus:ring-accent-500"
                  />
                  <label htmlFor="is_default" className="text-gray-300 text-sm">
                    Set as default address
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <button type="submit" className="btn-primary">
                    {editingAddress ? 'Update Address' : 'Add Address'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelAddressForm}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Address List */}
          {addressesLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-400">Loading addresses...</div>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-12">
              <MapPinIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No addresses saved yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Add your first shipping address
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-black/30 rounded-2xl p-6 border border-white/5 hover:border-accent-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {address.is_default && (
                        <span className="inline-block bg-accent-500/20 text-accent-400 text-xs px-3 py-1 rounded-full mb-2">
                          Default
                        </span>
                      )}
                      <p className="text-white font-medium">{address.street}</p>
                      <p className="text-gray-400 text-sm">
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p className="text-gray-400 text-sm">{address.country}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!address.is_default && (
                        <button
                          onClick={() => setDefaultAddress(address.id)}
                          className="text-gray-400 hover:text-accent-400 text-sm transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
