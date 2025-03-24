const { isAuth, isAdmin } = require('../../middlewares/auth')
const {
  getSecciones,
  getSeccionById,
  postSeccion,
  putSeccion,
  deleteSeccion
} = require('../controllers/secciones')

const seccionesRouter = require('express').Router()

seccionesRouter.get('/:id', getSeccionById)
seccionesRouter.get('/', getSecciones)
seccionesRouter.post('/', [isAdmin], postSeccion)
seccionesRouter.put('/:id', [isAdmin], putSeccion)
seccionesRouter.delete('/:id', [isAdmin], deleteSeccion)

module.exports = seccionesRouter
