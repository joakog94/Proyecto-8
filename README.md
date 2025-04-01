🐾 API para Gestión de Usuarios, Artículos y Secciones en Tienda de Mascotas

Este proyecto es una API backend construida con Node.js, Express y MongoDB para gestionar secciones y artículos de una tienda de mascotas. Además, incluye autenticación de usuarios mediante bcrypt y jsonwebtoken, permitiendo encriptar contraseñas y asignar diferentes roles a los usuarios.

🚀 Tecnologías Utilizadas

Node.js - Entorno de ejecución

Express - Framework para backend

MongoDB - Base de datos NoSQL

Mongoose - ODM para modelado de datos

bcrypt - Encriptación de contraseñas

jsonwebtoken (JWT) - Autenticación de usuarios

📌 Endpoints

🏬 Secciones

GET /api/v1/secciones → Obtiene todas las secciones

GET /api/v1/secciones/:id → Obtiene una sección por su ID

POST /api/v1/secciones → Crea una nueva sección

PUT /api/v1/secciones/:id → Actualiza una sección existente

DELETE /api/v1/secciones/:id → Elimina una sección por su ID

🛒 Artículos

GET /api/v1/articulos → Obtiene todos los artículos

GET /api/v1/articulos/:id → Obtiene un artículo por su ID

GET /api/v1/articulos/categoria/:categoria → Filtra artículos por categoría

GET /api/v1/articulos/precio/:precio → Obtiene artículos cuyo precio sea menor o igual al especificado

POST /api/v1/articulos → Crea un nuevo artículo

PUT /api/v1/articulos/:id → Actualiza un artículo existente

DELETE /api/v1/articulos/:id → Elimina un artículo por su ID

👥 Usuarios

GET /api/v1/users → Obtiene todos los usuarios registrados

POST /api/v1/users/register → Crea un nuevo usuario

POST /api/v1/users/login → Inicia sesión un usuario

PUT /api/v1/users/:id → Actualiza un usuario (solo un administrador puede hacerlo)

DELETE /api/v1/users/:id → Elimina un usuario (solo un administrador o el mismo usuario pueden eliminar su cuenta)

📂 Estructura de Datos

📌 Sección

{
  "nombre": "PERROS",
  "imagen": "url_imagen",
  "articulos": ["id_articulo1", "id_articulo2"]
}

⚠️ Nota: El array articulos no permite duplicados

📌 Artículo

{
  "nombre": "Cama para perro",
  "imagen": "url_imagen",
  "precio": 100,
  "categoria": "camas"
}

📌 Usuario

{
  "userName": "ejemploUsuario",
  "password": "contraseñaEncriptada",
  "rol": "user"
}

⚠️ Nota: El rol por defecto es "user", pero puede ser "admin"



