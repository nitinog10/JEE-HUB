import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiClock, FiFileText, FiPlay } from 'react-icons/fi'

const mockTests = [
  { id: 1, title: 'JEE Main Mock Test 1', subject: 'Full Syllabus', questions: 75, duration: 180, difficulty: 'Medium' },
  { id: 2, title: 'Physics - Mechanics', subject: 'Physics', questions: 30, duration: 60, difficulty: 'Hard' },
  { id: 3, title: 'Chemistry - Organic', subject: 'Chemistry', questions: 30, duration: 60, difficulty: 'Medium' },
  { id: 4, title: 'Maths - Calculus', subject: 'Mathematics', questions: 30, duration: 60, difficulty: 'Hard' },
  { id: 5, title: 'JEE Advanced Pattern', subject: 'Full Syllabus', questions: 54, duration: 180, difficulty: 'Hard' },
]

const difficultyColors = { Easy: 'bg-green-100 text-green-700', Medium: 'bg-yellow-100 text-yellow-700', Hard: 'bg-red-100 text-red-700' }

export default function Tests() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const filteredTests = filter === 'All' ? mockTests : mockTests.filter(t => t.subject === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mock Tests</h1>
          <p className="text-gray-500">Practice with timed tests and track your progress</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
          <option>All</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Mathematics</option>
          <option>Full Syllabus</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTests.map(test => (
          <div key={test.id} className="card hover:border-primary-500 border-2 border-transparent cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[test.difficulty]}`}>{test.difficulty}</span>
              <span className="text-sm text-gray-500">{test.subject}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-3">{test.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1"><FiFileText /> {test.questions} Qs</span>
              <span className="flex items-center gap-1"><FiClock /> {test.duration} min</span>
            </div>
            <button onClick={() => navigate(`/test/${test.id}`)}
              className="w-full btn-primary flex items-center justify-center gap-2 group-hover:bg-primary-700">
              <FiPlay /> Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
