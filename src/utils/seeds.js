const mongoose = require('mongoose')
const articulos = require('../data/articulos')
const Articulo = require('../api/models/articulos')

const lanzarSemilla = async () => {
  try {
    mongoose.connect(
      'mongodb+srv://gomezjoachim94:Jhz2B6GiNhxINqq7@cluster0.agnfaqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    await Articulo.collection.drop()
    console.log('articulos eliminadas')
    await Articulo.insertMany(articulos)
    console.log('articulos introducidas')
    await mongoose.disconnect()
  } catch (error) {
    console.log('Error en lanzar semilla')
  }
}

lanzarSemilla()
