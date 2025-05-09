const articulosRouter = require('./articulos')
const seccionesRouter = require('./secciones')
const usuariosRouter = require('./usuarios')

const mainRouter = require('express').Router()

mainRouter.use('/secciones', seccionesRouter)
mainRouter.use('/articulos', articulosRouter)
mainRouter.use('/usuarios', usuariosRouter)

module.exports = mainRouter
