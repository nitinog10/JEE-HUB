import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiClock, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi'

const sampleQuestions = [
  { id: 1, question: 'A ball is thrown vertically upward with velocity 20 m/s. What is the maximum height reached?', options: ['10 m', '20 m', '30 m', '40 m'], correct: 1, subject: 'Physics' },
  { id: 2, question: 'The hybridization of carbon in CO₂ is:', options: ['sp', 'sp²', 'sp³', 'sp³d'], correct: 0, subject: 'Chemistry' },
  { id: 3, question: 'If f(x) = x² + 2x + 1, then f\'(1) equals:', options: ['2', '3', '4', '5'], correct: 2, subject: 'Maths' },
  { id: 4, question: 'The SI unit of electric current is:', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 1, subject: 'Physics' },
  { id: 5, question: 'Which element has the highest electronegativity?', options: ['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'], correct: 2, subject: 'Chemistry' },
]

export default function TestAttempt() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, submitted])

  useEffect(() => {
    if (timeLeft === 0 && !submitted) handleSubmit()
  }, [timeLeft])

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const handleAnswer = (optionIdx) => {
    if (submitted) return
    setAnswers({ ...answers, [currentQ]: optionIdx })
  }

  const handleSubmit = () => {
    const correct = sampleQuestions.reduce((acc, q, idx) => acc + (answers[idx] === q.correct ? 1 : 0), 0)
    setScore({ correct, total: sampleQuestions.length, percentage: Math.round((correct / sampleQuestions.length) * 100) })
    setSubmitted(true)
    toast.success('Test submitted successfully!')
  }

  if (submitted && score) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Completed! 🎉</h2>
          <div className="text-6xl font-bold text-primary-600 mb-2">{score.percentage}%</div>
          <p className="text-gray-500 mb-6">You got {score.correct} out of {score.total} questions correct</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg"><p className="text-2xl font-bold text-green-600">{score.correct}</p><p className="text-sm text-gray-500">Correct</p></div>
            <div className="bg-red-50 p-4 rounded-lg"><p className="text-2xl font-bold text-red-600">{score.total - score.correct}</p><p className="text-sm text-gray-500">Wrong</p></div>
            <div className="bg-blue-50 p-4 rounded-lg"><p className="text-2xl font-bold text-blue-600">{score.total}</p><p className="text-sm text-gray-500">Total</p></div>
          </div>
          <button onClick={() => navigate('/tests')} className="btn-primary">Back to Tests</button>
        </div>
      </div>
    )
  }

  const q = sampleQuestions[currentQ]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Timer & Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <FiClock className={timeLeft < 300 ? 'text-red-500' : 'text-gray-600'} />
          <span className={timeLeft < 300 ? 'text-red-500' : ''}>{formatTime(timeLeft)}</span>
        </div>
        <span className="text-gray-500">Question {currentQ + 1} of {sampleQuestions.length}</span>
      </div>

      {/* Question Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {sampleQuestions.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentQ(idx)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentQ === idx ? 'bg-primary-600 text-white' : answers[idx] !== undefined ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="card mb-6">
        <span className="text-sm text-primary-600 font-medium">{q.subject}</span>
        <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-6">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${answers[currentQ] === idx ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <span className="font-medium mr-3">{String.fromCharCode(65 + idx)}.</span>{opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentQ(c => Math.max(0, c - 1))} disabled={currentQ === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50">
          <FiChevronLeft /> Previous
        </button>
        {currentQ === sampleQuestions.length - 1 ? (
          <button onClick={handleSubmit} className="btn-accent flex items-center gap-2"><FiCheck /> Submit Test</button>
        ) : (
          <button onClick={() => setCurrentQ(c => Math.min(sampleQuestions.length - 1, c + 1))}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700">
            Next <FiChevronRight />
          </button>
        )}
      </div>
    </div>
  )
}
