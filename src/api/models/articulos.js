const mongoose = require('mongoose')

const articuloSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {
      type: String,
      required: true,
      enum: ['alimentos', 'snacks', 'juguetes', 'ropa', 'camas']
    }
  },
  {
    timestamps: true,
    collection: 'articulos'
  }
)

const Articulo = mongoose.model('articulos', articuloSchema, 'articulos')

module.exports = Articulo
