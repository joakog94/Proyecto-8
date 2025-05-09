const { isAuth, isAdminOrSelf } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getArticulos,
  getArticuloById,
  getArticulosByCategory,
  getArticulosByPrice,
  postArticulo,
  putArticulo,
  deleteArticulo
} = require('../controllers/articulos')

const articulosRouter = require('express').Router()

articulosRouter.get('/precio/:precio', getArticulosByPrice)
articulosRouter.get('/categoria/:categoria', getArticulosByCategory)
articulosRouter.get('/:id', getArticuloById)
articulosRouter.get('/', getArticulos)
articulosRouter.post('/', [isAuth], upload.single('imagen'), postArticulo)
articulosRouter.put(
  '/:id',
  [isAdminOrSelf],
  upload.single('imagen'),
  putArticulo
)
articulosRouter.delete('/:id', [isAdminOrSelf], deleteArticulo)

module.exports = articulosRouter
