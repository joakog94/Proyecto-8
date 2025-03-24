const { isAdmin, isAdminOrSelf } = require('../../middlewares/auth')
const {
  getUsers,
  register,
  login,
  deleteUser,
  putUser
} = require('../controllers/users')

const usersRouter = require('express').Router()

usersRouter.get('/', [isAdmin], getUsers)
usersRouter.post('/register', register)
usersRouter.post('/login', login)
usersRouter.delete('/:id', [isAdminOrSelf], deleteUser)
usersRouter.put('/:id', [isAdmin], putUser)

module.exports = usersRouter
