import { useState } from 'react'
import { FiAward, FiTrendingUp, FiUser } from 'react-icons/fi'

const leaderboard = [
  { rank: 1, name: 'Arjun Sharma', score: 285, percentile: 99.8, tests: 45 },
  { rank: 2, name: 'Priya Patel', score: 278, percentile: 99.5, tests: 42 },
  { rank: 3, name: 'Rahul Kumar', score: 272, percentile: 99.2, tests: 40 },
  { rank: 4, name: 'Sneha Gupta', score: 265, percentile: 98.8, tests: 38 },
  { rank: 5, name: 'Amit Singh', score: 258, percentile: 98.2, tests: 35 },
  { rank: 6, name: 'Neha Verma', score: 250, percentile: 97.5, tests: 33 },
  { rank: 7, name: 'Vikram Reddy', score: 245, percentile: 96.8, tests: 30 },
  { rank: 8, name: 'You', score: 238, percentile: 95.5, tests: 28, isUser: true },
]

export default function Ranking() {
  const [period, setPeriod] = useState('weekly')
  const userRank = leaderboard.find(l => l.isUser)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
          <p className="text-gray-500">See how you rank among other aspirants</p>
        </div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="alltime">All Time</option>
        </select>
      </div>

      {/* User Stats */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-200">Your Current Rank</p>
            <p className="text-4xl font-bold">#{userRank?.rank}</p>
          </div>
          <div className="text-right">
            <p className="text-primary-200">Percentile</p>
            <p className="text-3xl font-bold">{userRank?.percentile}%</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden p-0">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Score</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Percentile</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leaderboard.map((user) => (
              <tr key={user.rank} className={user.isUser ? 'bg-primary-50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4">
                  {user.rank <= 3 ? (
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-gray-300' : 'bg-orange-400'} text-white font-bold`}>
                      {user.rank}
                    </span>
                  ) : <span className="text-gray-600 font-medium">#{user.rank}</span>}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{user.name} {user.isUser && <span className="text-primary-600">(You)</span>}</td>
                <td className="px-6 py-4 text-gray-600">{user.score}</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">{user.percentile}%</span></td>
                <td className="px-6 py-4 text-gray-600">{user.tests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
