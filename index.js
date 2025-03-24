require('dotenv').config()
const { connectDB } = require('./src/config/db')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const seccionesRouter = require('./src/api/routes/secciones')
const articulosRouter = require('./src/api/routes/articulos')
const usersRouter = require('./src/api/routes/users')

connectDB()
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/articulos', articulosRouter)
app.use('/api/v1/secciones', seccionesRouter)

app.use('*', (req, res, next) => {
  res.status(404).json('Route not found')
})
app.listen(3000, () => {
  console.log('Servidor levantado en http://localhost:3000 🥳')
})
