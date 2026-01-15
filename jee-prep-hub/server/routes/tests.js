import express from 'express'
import { auth } from '../middleware/auth.js'
import TestResult from '../models/TestResult.js'

const router = express.Router()

const mockTests = [
  { id: '1', title: 'JEE Main Mock Test 1', subject: 'Full Syllabus', questions: 75, duration: 180 },
  { id: '2', title: 'Physics - Mechanics', subject: 'Physics', questions: 30, duration: 60 },
  { id: '3', title: 'Chemistry - Organic', subject: 'Chemistry', questions: 30, duration: 60 },
  { id: '4', title: 'Maths - Calculus', subject: 'Mathematics', questions: 30, duration: 60 },
]

router.get('/', (req, res) => {
  res.json(mockTests)
})

router.get('/:id', (req, res) => {
  const test = mockTests.find(t => t.id === req.params.id)
  if (!test) return res.status(404).json({ message: 'Test not found' })
  res.json(test)
})

router.post('/:id/submit', auth, async (req, res) => {
  try {
    const { score, totalQuestions, correctAnswers, timeTaken } = req.body
    
    try {
      await TestResult.create({
        userId: req.userId,
        testId: req.params.id,
        score, totalQuestions, correctAnswers, timeTaken
      })
    } catch {
      // Mock mode - just return success
    }
    
    res.json({ message: 'Test submitted', score, percentage: Math.round((correctAnswers / totalQuestions) * 100) })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
