import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock, FiCalendar, FiUserPlus } from 'react-icons/fi'

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', grade: '11', targetYear: '2026' })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signup(formData)
      toast.success('Account created! Let\'s ace JEE! 🎯')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Join JEE Prep Hub</h1>
          <p className="text-gray-500 mt-2">Start your preparation journey today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" required />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" required />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500" required minLength={6} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select name="grade" value={formData.grade} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="dropper">Dropper</option>
              </select>
            </div>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select name="targetYear" value={formData.targetYear} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option value="2026">JEE 2026</option>
                <option value="2027">JEE 2027</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
            <FiUserPlus /> {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
