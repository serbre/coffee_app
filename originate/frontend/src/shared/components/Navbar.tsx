import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export const Navbar = () => {
  const { user, signOut } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-black/80 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <h1 className="text-3xl font-display font-bold text-white group-hover:text-accent-400 transition-colors">
              Originate
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors font-medium">
              Shop
            </Link>
            <Link to="/subscriptions" className="text-gray-300 hover:text-white transition-colors font-medium">
              Subscriptions
            </Link>
            <Link to="/roasters" className="text-gray-300 hover:text-white transition-colors font-medium">
              Suppliers
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors font-medium">
              About
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingCartIcon className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-coffee-900 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-t-2xl transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-b-2xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-200">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
