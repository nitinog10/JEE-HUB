import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  grade: { type: String, default: '11' },
  targetYear: { type: String, default: '2026' },
  testsAttempted: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  badges: [String],
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)
