import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { FiTarget, FiAward, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

const quotes = [
  "Success is the sum of small efforts, repeated daily. 💪",
  "Dream big, work hard, stay focused. 🎯",
  "Every expert was once a beginner. Keep going! 🚀",
  "Your only limit is your mind. Break through! 🔥",
  "Consistency beats intensity. Show up daily! ⭐"
]

export default function Dashboard() {
  const { user } = useAuth()
  const [quote, setQuote] = useState('')
  const [stats] = useState({ testsAttempted: 12, rankPercentile: 87.5, accuracy: 72, streak: 5 })

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ label: 'Score %', data: [65, 70, 75, 82], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.4 }]
  }

  const subjectData = {
    labels: ['Physics', 'Chemistry', 'Maths'],
    datasets: [{ data: [75, 68, 82], backgroundColor: ['#3b82f6', '#f97316', '#10b981'] }]
  }

  return (
    <div className="space-y-6">
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold">Hello, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="mt-2 text-primary-100">{quote}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Target: JEE {user?.targetYear}</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Class {user?.grade}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FiCheckCircle, label: 'Tests Attempted', value: stats.testsAttempted, color: 'text-blue-500' },
          { icon: FiAward, label: 'Rank Percentile', value: `${stats.rankPercentile}%`, color: 'text-orange-500' },
          { icon: FiTarget, label: 'Accuracy', value: `${stats.accuracy}%`, color: 'text-green-500' },
          { icon: FiTrendingUp, label: 'Day Streak', value: `${stats.streak} 🔥`, color: 'text-purple-500' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card">
            <Icon className={`${color} mb-2`} size={24} />
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Progress Over Time</h3>
          <Line data={progressData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-800 mb-4">Subject-wise Performance</h3>
          <div className="max-w-[250px] mx-auto"><Doughnut data={subjectData} /></div>
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4">Your Badges 🏆</h3>
        <div className="flex flex-wrap gap-3">
          {['Consistency Champ', 'Quick Learner', 'Physics Pro'].map(badge => (
            <span key={badge} className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium">{badge}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
