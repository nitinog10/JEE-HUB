import mongoose from 'mongoose'

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  timeTaken: { type: Number }, // in seconds
  submittedAt: { type: Date, default: Date.now }
})

export default mongoose.model('TestResult', testResultSchema)
