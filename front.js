const printArticulos = (articulos) => {
  for (const articulo of articulos) {
    document.body.innerHTML += `
   <div class="articulo">
     <h3>${articulo.nombre}</h3>
     <div>
      <img src="${articulo.imagen}"></img>
     </div>
     <p>${articulo.precio}€</p>
     </div>`
  }
}

fetch('http://localhost:3000/api/v1/articulos/')
  .then((res) => res.json())
  .then((articulos) => {
    printArticulos(articulos)
  })
