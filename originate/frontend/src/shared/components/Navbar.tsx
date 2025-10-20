import { Link } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export const Navbar = () => {
  const { user, signOut } = useAuth()
  const { itemCount } = useCart()

  return (
    <nav className="glass sticky top-0 z-50 border-b border-coffee-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-display font-bold text-coffee-100">
              Originate
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-coffee-200 hover:text-coffee-50 transition-colors">
              Shop
            </Link>
            <Link to="/subscriptions" className="text-coffee-200 hover:text-coffee-50 transition-colors">
              Subscriptions
            </Link>
            <Link to="/roasters" className="text-coffee-200 hover:text-coffee-50 transition-colors">
              Roasters
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-coffee-100 hover:text-coffee-50 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-coffee-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6 text-coffee-100 hover:text-coffee-50 transition-colors" />
                </button>
                <div className="absolute right-0 mt-2 w-48 glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-coffee-100 hover:bg-white/10 rounded-t-lg"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-coffee-100 hover:bg-white/10"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-coffee-100 hover:bg-white/10 rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
