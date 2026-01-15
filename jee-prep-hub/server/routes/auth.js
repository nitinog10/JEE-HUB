import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

// Mock user for demo (when MongoDB not connected)
let mockUsers = []

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, grade, targetYear } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    
    let user
    try {
      const existing = await User.findOne({ email })
      if (existing) return res.status(400).json({ message: 'Email already exists' })
      user = await User.create({ name, email, password: hashedPassword, grade, targetYear })
    } catch {
      // Mock mode
      if (mockUsers.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      user = { _id: Date.now().toString(), name, email, grade, targetYear, testsAttempted: 0 }
      mockUsers.push({ ...user, password: hashedPassword })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token, user: { id: user._id, name, email, grade, targetYear } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    let user
    try {
      user = await User.findOne({ email })
    } catch {
      user = mockUsers.find(u => u.email === email)
    }
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email, grade: user.grade, targetYear: user.targetYear } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
