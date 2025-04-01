require('dotenv').config()
const { connectDB } = require('./src/config/db')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const mainRouter = require('./src/api/routes/main')
const cloudinary = require('cloudinary').v2

connectDB()
const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())
app.use(
  cors({
    origin:
      'https://proyecto-8-exid0wu5s-joakos-projects.vercel.app/api/v1/articulos', // Permite cualquier origen (para pruebas)
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  })
)

app.use('/api/v1', mainRouter)

app.use('*', (req, res, next) => {
  res.status(404).json('Route not found')
})
app.listen(3000, () => {
  console.log('Servidor levantado en http://localhost:3000 🥳')
})
