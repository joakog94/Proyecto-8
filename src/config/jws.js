const jwt = require('jsonwebtoken')

const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1y' })
}

// esta funcion me sirve para comprobar si la llave la hicimos nosotros

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateSign, verifyJwt }
