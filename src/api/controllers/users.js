const { generateSign } = require('../../config/jws')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('Error en la peticion de usuarios')
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user'
    })
    const duplicateUser = await User.findOne({ userName: req.body.userName })

    if (duplicateUser) {
      return res.status(400).json('Busca otro nombre')
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Error en el registro')
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    if (!user) {
      return res.status(400).json('Usuario no existente')
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('La contraseña no es correcta')
    }
  } catch (error) {
    return res.status(400).json('Error en el registro')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(404).json('Error en la eliminación')
  }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new User(req.body)
    newUser._id = id
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })
    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

module.exports = { getUsers, register, login, deleteUser, putUser }
