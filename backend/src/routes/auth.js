const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router()

// Login API
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    // Send failure, if user has not send the email/password from client
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and Password are required.'
        })
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        const user = result.rows[0]

        // Check if user exists
        if (!user) return res.status(401).json({ message: 'Invalid Credentials' })
        
        // Checking password match
        const isMatchingPassword = await bcrypt.compare(password, user.password)
        if (!isMatchingPassword) return res.status(401).json({ message: 'Invalid Credentials' })

        // If credentials are correct - proceed with login.
        // Creating access-token using user creds
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        // Storing accesstoken in cookies, instead of localStorage.
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ role: user.role })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong in the server side. Please try again!'
        })
    }
})

// Signup API
router.post('/signup', async (req, res) => {
    const { password, email } = req.body
    // Send failure, if user has not send the email/password from client
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and Password are required.'
        })
    }

    try {
        // Check if email already exists before signingup
        const isExistingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1', 
            [email]
        )
        if (isExistingUser.rows.length) return res.status(409).json({ message: 'Email already exists.' })

        // Hashing the password
        const hashedPword = await bcrypt.hash(password, 10)
        // Logic for assigning Admin/Standard role for new user.
        const role = email.endsWith('@nebula-corp.com') ? 'admin' : 'standard'

        // Add user in DB and send res to FE
        const result = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
            [email, hashedPword, role]
        )
        res.status(201).json({
            user: result.rows[0],
            message: 'User created successfully.'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong on the server side. Please try again!'
        })
    }

})

// logout
router.post('/logout', async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    
    res.status(200).json({
        message: 'User logged out successfully'
    })
})

module.exports = router