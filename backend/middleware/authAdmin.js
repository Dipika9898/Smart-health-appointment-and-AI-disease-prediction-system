import jwt from 'jsonwebtoken'

// ADMIN AUTHENTICATION MIDDLEWARE
const authAdmin = (req, res, next) => {
  try {
    // Read Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
    }

    // Format: "Bearer <token>"
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if the decoded email matches admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
    }

    // Attach admin info to req if needed
    req.adminEmail = decoded.email

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
  }
}

export default authAdmin