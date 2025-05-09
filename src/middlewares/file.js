const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'Tienda'

    if (req.baseUrl.includes('usuarios')) folder = 'Usuarios'
    if (req.baseUrl.includes('articulos')) folder = 'Articulos'
    if (req.baseUrl.includes('secciones')) folder = 'Secciones'

    return {
      folder,
      allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
      use_filename: true
    }
  }
})

const upload = multer({ storage })
module.exports = upload
