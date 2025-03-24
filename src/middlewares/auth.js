const User = require('../api/models/users')
const { verifyJwt } = require('../config/jws')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    user.password = null
    req.user = user

    next()
  } catch (error) {
    return res.status(400).json('No estas autorizado')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('Esta accion solo la pueden realizar los administradores')
    }
  } catch (error) {
    return res.status(400).json('No estas autorizado')
  }
}

const isAdminOrSelf = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    if (user.role === 'admin' || user._id.toString() === id) {
      next()
    } else {
      return res
        .status(400)
        .json({ error: 'No tienes permisos para esta acción' })
    }
  } catch (error) {
    return res.status(400).json('No estas autorizado')
  }
}

module.exports = { isAuth, isAdmin, isAdminOrSelf }
