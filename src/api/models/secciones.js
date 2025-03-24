const mongoose = require('mongoose')

const seccionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    articulos: [
      { type: mongoose.Types.ObjectId, ref: 'articulos', required: false }
    ]
  },
  {
    timestamps: true,
    collection: 'seccciones'
  }
)

const Seccion = mongoose.model('secciones', seccionSchema, 'secciones')

module.exports = Seccion
