import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../shared/contexts/AuthContext'
import { UserRole } from '../shared/types'

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<UserRole>('consumer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        console.log('Starting sign in...')
        const { error } = await signIn(email, password)
        console.log('Sign in response:', { error })
        if (error) throw error
        console.log('Sign in successful, navigating...')
        // Navigate immediately - DashboardPage will handle loading state
        navigate(redirect === '/' ? '/dashboard' : redirect)
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name')
          setLoading(false)
          return
        }
        const { error } = await signUp(email, password, fullName, role)
        if (error) throw error
        // Navigate immediately - DashboardPage will handle loading state
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-coffee-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join Originate'}
          </h2>
          <p className="text-gray-400">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field w-full"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  I am a...
                </label>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:border-accent-500/50 transition-all">
                    <input
                      type="radio"
                      name="role"
                      value="consumer"
                      checked={role === 'consumer'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="mt-1 accent-accent-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Coffee Lover</div>
                      <div className="text-sm text-gray-400">I want to buy coffee from local suppliers</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:border-accent-500/50 transition-all">
                    <input
                      type="radio"
                      name="role"
                      value="supplier"
                      checked={role === 'supplier'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="mt-1 accent-accent-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Local Supplier</div>
                      <div className="text-sm text-gray-400">I want to distribute coffee to local consumers</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:border-accent-500/50 transition-all">
                    <input
                      type="radio"
                      name="role"
                      value="company_provider"
                      checked={role === 'company_provider'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="mt-1 accent-accent-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Coffee Company</div>
                      <div className="text-sm text-gray-400">I have a coffee brand and want to work with suppliers</div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
