const { isAdminOrSelf } = require('../../middlewares/auth')
const {
  getUsers,
  register,
  login,
  deleteUser,
  putUser
} = require('../controllers/usuarios')

const usuariosRouter = require('express').Router()

usuariosRouter.get('/', [isAdminOrSelf], getUsers)
usuariosRouter.post('/register', register)
usuariosRouter.post('/login', login)
usuariosRouter.delete('/:id', [isAdminOrSelf], deleteUser)
usuariosRouter.put('/:id', [isAdminOrSelf], putUser)

module.exports = usuariosRouter
