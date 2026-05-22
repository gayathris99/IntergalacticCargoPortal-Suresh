require('dotenv').config();
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const authRoutes = require('./routes/auth')
const cargoRoutes = require('./routes/cargo')

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

app.use('/auth', authRoutes)
app.use('/api', cargoRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);