const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const usuarioSchema = new mongoose.Schema(
  {
    nombreUsuario: { type: String, required: true },
    contraseña: { type: String, required: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'usuario'],
      default: 'usuario'
    }
  },
  {
    timestamps: true,
    collection: 'usuarios'
  }
)

usuarioSchema.pre('save', function () {
  this.contraseña = bcrypt.hashSync(this.contraseña, 10)
})

const Usuario = mongoose.model('usuarios', usuarioSchema, 'usuarios')

module.exports = Usuario
