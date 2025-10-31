import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './shared/contexts/AuthContext'
import { CartProvider } from './shared/contexts/CartContext'
import { Navbar } from './shared/components/Navbar'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { SuppliersPage } from './pages/SuppliersPage'
import { AboutPage } from './pages/AboutPage'
import { SubscriptionsPage } from './pages/SubscriptionsPage'
import { ProfileSettingsPage } from './pages/ProfileSettingsPage'
import { SupplierOnboardingPage } from './pages/onboarding/SupplierOnboardingPage'
import { CompanyProviderOnboardingPage } from './pages/onboarding/CompanyProviderOnboardingPage'
import { SupplierOrdersPage } from './pages/supplier/SupplierOrdersPage'
import { CompanyProductsPage } from './pages/company/CompanyProductsPage'

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
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roasters" element={<SuppliersPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/profile/settings" element={<ProfileSettingsPage />} />
              <Route path="/onboarding/supplier" element={<SupplierOnboardingPage />} />
              <Route path="/onboarding/company" element={<CompanyProviderOnboardingPage />} />
              <Route path="/supplier/orders" element={<SupplierOrdersPage />} />
              <Route path="/company/products" element={<CompanyProductsPage />} />
              {/* Add more routes as we build them */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="bg-coffee-900 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">
                      Coming Soon
                    </h2>
                    <p className="text-gray-400">
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
