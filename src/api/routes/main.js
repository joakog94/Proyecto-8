const articulosRouter = require('./articulos')
const seccionesRouter = require('./secciones')
const usersRouter = require('./users')

const mainRouter = require('express').Router()

mainRouter.use('/secciones', seccionesRouter)
mainRouter.use('/articulos', articulosRouter)
mainRouter.use('/users', usersRouter)

module.exports = mainRouter
