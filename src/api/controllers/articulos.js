const { deleteFile } = require('../../utils/deleteFile')
const Articulo = require('../models/articulos')

const getArticulos = async (req, res, next) => {
  try {
    const articulos = await Articulo.find()
    return res.status(200).json(articulos)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const getArticuloById = async (req, res, next) => {
  try {
    const { id } = req.params
    const articulo = await Articulo.findById(id)
    return res.status(200).json(articulo)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const getArticulosByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params
    const articulos = await Articulo.find({ categoria })
    return res.status(200).json(articulos)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const getArticulosByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params
    const articulos = await Articulo.find({ precio: { $lte: precio } })
    return res.status(200).json(articulos)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const postArticulo = async (req, res, next) => {
  try {
    const newArticulo = new Articulo(req.body)
    if (req.file) {
      console.log(req.file)
      newArticulo.imagen = req.file.path
    }
    const articuloSaved = await newArticulo.save()
    return res.status(201).json(articuloSaved)
  } catch (error) {
    return res.status(404).json('Error en la petición de subida')
  }
}

const putArticulo = async (req, res, next) => {
  try {
    const { id } = req.params
    const newArticulo = new Articulo(req.body)
    newArticulo._id = id

    if (req.file) {
      newArticulo.imagen = req.file.path
      const oldArticulo = await Articulo.findById(id)
      deleteFile(oldArticulo.imagen)
    }
    const articuloUpdated = await Articulo.findByIdAndUpdate(id, newArticulo, {
      new: true
    })
    return res.status(200).json(articuloUpdated)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const deleteArticulo = async (req, res, next) => {
  try {
    const { id } = req.params
    const articuloDeleted = await Articulo.findByIdAndDelete(id)
    deleteFile(articuloDeleted.imagen)
    return res.status(200).json(articuloDeleted)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

module.exports = {
  getArticulos,
  getArticuloById,
  getArticulosByCategory,
  getArticulosByPrice,
  postArticulo,
  putArticulo,
  deleteArticulo
}
