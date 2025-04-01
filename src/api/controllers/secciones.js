const { deleteFile } = require('../../utils/deleteFile')
const Seccion = require('../models/secciones')

const getSecciones = async (req, res, next) => {
  try {
    const secciones = await Seccion.find().populate('articulos')
    return res.status(200).json(secciones)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const getSeccionById = async (req, res, next) => {
  try {
    const { id } = req.params
    const seccion = await Seccion.findById(id).populate('articulos')
    return res.status(200).json(seccion)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const postSeccion = async (req, res, next) => {
  try {
    // Verificar si req.body.articulos existe
    if (req.body.articulos && Array.isArray(req.body.articulos)) {
      // Eliminar duplicados del array de articulos
      req.body.articulos = Array.from(
        new Set(req.body.articulos.map((id) => id.toString()))
      )
    }
    const newSeccion = new Seccion(req.body)
    if (req.file) {
      newSeccion.imagen = req.file.path
    }
    const seccionSaved = await newSeccion.save()
    return res.status(201).json(seccionSaved)
  } catch (error) {
    return res.status(404).json('Error en la petición de posteo')
  }
}

const putSeccion = async (req, res, next) => {
  try {
    const { id } = req.params

    // Validar que 'articulos' sea un array si existe
    if (
      req.body.articulos !== undefined &&
      !Array.isArray(req.body.articulos)
    ) {
      return res
        .status(400)
        .json({ error: "El campo 'articulos' debe ser un array" })
    }

    // Obtener la sección actual
    const oldSeccion = await Seccion.findById(id)
    if (!oldSeccion) {
      return res.status(404).json({ error: 'Sección no encontrada' })
    }

    // Combinar artículos antiguos y nuevos (si existen)
    const nuevosArticulos = req.body.articulos || []
    const articulosUnicos = Array.from(
      new Set([
        ...oldSeccion.articulos.map((id) => id.toString()),
        ...nuevosArticulos.map((id) => id.toString())
      ])
    )
    // Crear objeto de actualización que incluya TODOS los campos del body
    const updateData = {
      ...req.body,
      articulos: articulosUnicos // Sobrescribe 'articulos' con el array combinado
    }

    if (req.file) {
      updateData.imagen = req.file.path
      deleteFile(oldSeccion.imagen)
    }

    // Actualizar el documento
    const seccionUpdated = await Seccion.findByIdAndUpdate(
      id,
      updateData, // <-- Enviamos todo el objeto de actualización
      { new: true, runValidators: true } // Opciones
    ).populate('articulos')

    return res.status(200).json(seccionUpdated)
  } catch (error) {
    return res.status(404).json('Error en la petición')
  }
}

const deleteSeccion = async (req, res, next) => {
  try {
    const { id } = req.params
    const seccionDeleted = await Seccion.findByIdAndDelete(id)
    deleteFile(seccionDeleted.imagen)

    return res.status(200).json(seccionDeleted)
  } catch (error) {
    return res.status(404).json('Error en la eliminación')
  }
}

module.exports = {
  getSecciones,
  getSeccionById,
  postSeccion,
  putSeccion,
  deleteSeccion
}
