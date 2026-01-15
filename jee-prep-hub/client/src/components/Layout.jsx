import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiHome, FiFileText, FiAward, FiBook, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

const navItems = [
  { path: '/', icon: FiHome, label: 'Dashboard' },
  { path: '/tests', icon: FiFileText, label: 'Tests' },
  { path: '/papers', icon: FiBook, label: 'Papers' },
  { path: '/ranking', icon: FiAward, label: 'Ranking' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-700 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
        <div className="p-6 border-b border-primary-600">
          <h1 className="text-xl font-bold">JEE Prep Hub</h1>
          <p className="text-primary-200 text-sm mt-1">Welcome, {user?.name?.split(' ')[0]}</p>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white text-primary-700' : 'hover:bg-primary-600'}`}>
              <Icon size={20} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="absolute bottom-6 left-4 right-4 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors">
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
          <h1 className="text-lg font-bold text-primary-700">JEE Prep Hub</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </header>
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  )
}
