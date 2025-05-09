const { isAdminOrSelf } = require('../../middlewares/auth')
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
seccionesRouter.post('/', [isAdminOrSelf], upload.single('imagen'), postSeccion)
seccionesRouter.put(
  '/:id',
  [isAdminOrSelf],
  upload.single('imagen'),
  putSeccion
)
seccionesRouter.delete('/:id', [isAdminOrSelf], deleteSeccion)

module.exports = seccionesRouter
