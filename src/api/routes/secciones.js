const { isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
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
seccionesRouter.post('/', [isAdmin], upload.single('imagen'), postSeccion)
seccionesRouter.put('/:id', [isAdmin], upload.single('imagen'), putSeccion)
seccionesRouter.delete('/:id', [isAdmin], deleteSeccion)

module.exports = seccionesRouter
