import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import testRoutes from './routes/tests.js'
import rankingRoutes from './routes/ranking.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tests', testRoutes)
app.use('/api/ranking', rankingRoutes)

// Motivation quotes endpoint
const quotes = [
  "Success is the sum of small efforts, repeated daily.",
  "Dream big, work hard, stay focused.",
  "Every expert was once a beginner.",
  "Your only limit is your mind.",
  "Consistency beats intensity."
]
app.get('/api/motivation', (req, res) => {
  res.json({ quote: quotes[Math.floor(Math.random() * quotes.length)] })
})

const PORT = process.env.PORT || 5000

// Connect to MongoDB (optional - works without it using mock data)
const startServer = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Connected to MongoDB')
    }
  } catch (err) {
    console.log('MongoDB not connected, using mock data')
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startServer()
