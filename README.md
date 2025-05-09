# 🐾 API para Tienda de Mascotas con Cloudinary

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**, que permite gestionar usuarios, artículos y secciones dentro de una tienda de mascotas.  
Incluye **subida de imágenes mediante Cloudinary**, autenticación con **JWT**, encriptación de contraseñas y control de roles (admin / usuario).

---

## 🚀 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución JavaScript
- **Express** – Framework web para APIs
- **MongoDB** – Base de datos NoSQL
- **Mongoose** – Modelado de datos con ODM
- **bcrypt** – Encriptación de contraseñas
- **jsonwebtoken (JWT)** – Autenticación basada en tokens
- **Cloudinary** – Gestión de imágenes
- **Multer** – Middleware para subida de archivos

---

## 🗂 Endpoints Principales

### 🏬 Secciones

| Método | Endpoint                | Descripción                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | `/api/v1/secciones`     | Obtener todas las secciones  |
| GET    | `/api/v1/secciones/:id` | Obtener sección por ID       |
| POST   | `/api/v1/secciones`     | Crear nueva sección          |
| PUT    | `/api/v1/secciones/:id` | Actualizar sección existente |
| DELETE | `/api/v1/secciones/:id` | Eliminar sección por ID      |

### 🛒 Artículos

| Método | Endpoint                           | Descripción                 |
| ------ | ---------------------------------- | --------------------------- |
| GET    | `/api/v1/articulos`                | Obtener todos los artículos |
| GET    | `/api/v1/articulos/:id`            | Obtener artículo por ID     |
| GET    | `/api/v1/articulos/categoria/:cat` | Filtrar por categoría       |
| GET    | `/api/v1/articulos/precio/:precio` | Filtrar por precio máximo   |
| POST   | `/api/v1/articulos`                | Crear nuevo artículo        |
| PUT    | `/api/v1/articulos/:id`            | Actualizar artículo         |
| DELETE | `/api/v1/articulos/:id`            | Eliminar artículo           |

### 👤 Usuarios

| Método | Endpoint                    | Descripción                                        |
| ------ | --------------------------- | -------------------------------------------------- |
| GET    | `/api/v1/usuarios`          | Obtener todos los usuarios (admin)                 |
| POST   | `/api/v1/usuarios/register` | Registrar nuevo usuario                            |
| POST   | `/api/v1/usuarios/login`    | Iniciar sesión y obtener token                     |
| PUT    | `/api/v1/usuarios/:id`      | Actualizar usuario (solo admin o el mismo usuario) |
| DELETE | `/api/v1/usuarios/:id`      | Eliminar usuario (solo admin o el mismo usuario)   |

---

## 📘 Esquema de Datos

### Sección

```json
{
  "nombre": "PERROS",
  "imagen": "url_imagen",
  "articulos": ["id_articulo1", "id_articulo2"]
}
```

### Artículo

```json
{
  "nombre": "Cama para perro",
  "imagen": "url_imagen",
  "precio": 100,
  "categoria": "camas"
}
```

### Usuario

```json
{
  "nombreUsuario": "ejemploUsuario",
  "contraseña": "hashEncriptado",
  "rol": "user"
}
```

## 🔐 Autenticación y Roles

- Los endpoints protegidos requieren un header `Authorization: Bearer <token>`.
- El token se obtiene al hacer login.
- Hay rutas restringidas a administradores (`admin`) y otras disponibles solo para el propio usuario (`adminOrSelf`).
