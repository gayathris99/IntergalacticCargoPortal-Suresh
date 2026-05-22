const express = require('express')
const verifyToken = require('../middleware/auth')
const pool = require('../db')

const router = express.Router()

const isPrimeNumber = (num) => {
    if (num < 2) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
    }
    return true
}

router.get('/cargo', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cargo')
        res.status(200).json({ cargo: result.rows })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong on the server side. Please try again' })
    }
})

router.post('/upload', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Clearance level inadequate.' })
    }

    if (!req.files || !req.files.manifest) {
        return res.status(400).json({ message: 'No file found. Please upload your file' })
    }

    const fileContent = req.files.manifest.data.toString('utf8').split('\n')
    const savedCargos = []
    const removedCargos = []

    for (const content of fileContent) {
        if (!content.trim()) continue

        const [dateContent, rest] = content.split(' || ')
        const date = dateContent.replace('[', '').replace(']', '').trim()
        const [cargoId, rest1] = rest.split(' :: ')
        const [actualWeight, destination] = rest1.split(' >> ')
        let weight = parseInt(actualWeight.trim())

        if (destination.trim().toLowerCase().includes('sector-7')) {
            weight = Math.round(weight * 1.45)
        }

        if (isPrimeNumber(weight)) {
            removedCargos.push(cargoId.trim())
            continue
        }

        await pool.query(
            'INSERT INTO cargo (cargo_id, weight, destination, date) VALUES ($1, $2, $3, $4)',
            [cargoId.trim(), weight, destination.trim(), date]
        )
        savedCargos.push(cargoId.trim())
    }

    res.status(200).json({
        message: 'Manifest uploaded successfully.',
        savedCargos,
        removedCargos
    })
})

module.exports = router