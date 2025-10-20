import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './shared/contexts/AuthContext'
import { CartProvider } from './shared/contexts/CartContext'
import { Navbar } from './shared/components/Navbar'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { CartPage } from './pages/CartPage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* Add more routes as we build them */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="glass-card text-center">
                    <h2 className="text-2xl font-display font-bold text-coffee-50 mb-2">
                      Coming Soon
                    </h2>
                    <p className="text-coffee-200">
                      This page is under construction
                    </p>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
