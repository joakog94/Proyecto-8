const Usuario = require('../api/models/usuarios')
const { verifyJwt } = require('../config/jws')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await Usuario.findById(id)

    user.contraseña = null
    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ error: 'No estás autenticado' })
  }
}

const isAdminOrSelf = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    const user = await Usuario.findById(id)

    user.contraseña = null
    req.user = user

    const esAdmin = user.rol === 'admin'
    const esElMismo =
      req.params.id && user._id.toString() === req.params.id.toString()

    if (esAdmin || esElMismo) {
      return next()
    }

    return res
      .status(403)
      .json({ error: 'No tienes permisos para esta acción' })
  } catch (error) {
    console.error('❌ Error en isAdminOrSelf:', error)
    return res.status(401).json({ error: 'No estás autenticado' })
  }
}

module.exports = { isAuth, isAdminOrSelf }
