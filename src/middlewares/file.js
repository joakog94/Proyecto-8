const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Articulos',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp']
  }
})

const upload = multer({ storage })
module.exports = upload
