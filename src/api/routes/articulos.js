const { isAuth, isAdmin } = require('../../middlewares/auth')
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
articulosRouter.post('/', [isAuth], postArticulo)
articulosRouter.put('/:id', [isAdmin], putArticulo)
articulosRouter.delete('/:id', [isAdmin], deleteArticulo)

module.exports = articulosRouter
