import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ message: 'No token provided' })
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    req.userId = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
