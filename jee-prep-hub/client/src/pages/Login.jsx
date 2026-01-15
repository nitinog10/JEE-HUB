import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back! 🚀')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">JEE Prep Hub</h1>
          <p className="text-gray-500 mt-2">Your JEE Journey Starts Here 🚀</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" required />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" required />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
            <FiLogIn /> {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="my-6 flex items-center"><div className="flex-1 border-t border-gray-300"></div><span className="px-4 text-gray-500 text-sm">or</span><div className="flex-1 border-t border-gray-300"></div></div>

        <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <Link to="/signup" className="text-primary-600 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
