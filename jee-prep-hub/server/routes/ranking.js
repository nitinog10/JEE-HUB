import express from 'express'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, name: 'Arjun Sharma', score: 285, percentile: 99.8, tests: 45 },
  { rank: 2, name: 'Priya Patel', score: 278, percentile: 99.5, tests: 42 },
  { rank: 3, name: 'Rahul Kumar', score: 272, percentile: 99.2, tests: 40 },
  { rank: 4, name: 'Sneha Gupta', score: 265, percentile: 98.8, tests: 38 },
  { rank: 5, name: 'Amit Singh', score: 258, percentile: 98.2, tests: 35 },
]

router.get('/leaderboard', (req, res) => {
  res.json(mockLeaderboard)
})

router.get('/my-rank', auth, (req, res) => {
  // In production, calculate from actual test results
  res.json({ rank: 8, percentile: 95.5, totalUsers: 1000 })
})

export default router
