const jwt = require('jsonwebtoken')

// We are adding this middleware to check existence of token, beofre going to make api call
const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: 'No token found'})

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodeToken
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Invalid Token'
        })
    }
}
module.exports = verifyToken