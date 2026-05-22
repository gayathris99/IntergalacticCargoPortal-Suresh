require('dotenv').config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth')

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(cookieParser())


app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);