const { generateSign } = require('../../config/jws')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await Usuario.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json({ error: 'Error en la peticion de usuarios' })
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new Usuario({
      nombreUsuario: req.body.nombreUsuario,
      contraseña: req.body.contraseña,
      rol: 'usuario'
    })
    const duplicateUser = await Usuario.findOne({
      nombreUsuario: req.body.nombreUsuario
    })

    if (duplicateUser) {
      return res.status(400).json({ error: 'Busca otro nombre' })
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    console.error('❌ Error en el registro:', error)
    res.status(400).json({
      message: 'Error en el registro',
      error: error.message
    })
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Usuario.findOne({
      nombreUsuario: req.body.nombreUsuario
    })
    if (!user) {
      return res.status(404).json({ error: 'Usuario no existente' })
    }
    if (bcrypt.compareSync(req.body.contraseña, user.contraseña)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(404).json({ error: 'La contraseña no es correcta' })
    }
  } catch (error) {
    return res.status(400).json({ error: 'Error en el registro' })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await Usuario.findByIdAndDelete(id)
    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(404).json({ error: 'Error en la eliminación' })
  }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new Usuario(req.body)
    newUser._id = id
    const userUpdated = await Usuario.findByIdAndUpdate(id, newUser, {
      new: true
    })
    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json({ error: 'Error en la peticion' })
  }
}

module.exports = { getUsers, register, login, deleteUser, putUser }
