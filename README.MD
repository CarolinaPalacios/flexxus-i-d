## Funciones

### Cómo utilizar

Para ejecutar las funciones localmente, ejecuta el siguiente script:

```bash
npm run funct
```

Ten en cuenta que la llamada a cada función está comentada en el código. Debes descomentar la línea relevante para ejecutar la función. Las mismas se encuentran en la carpeta `functions`.

## Consultas SQL

Todas las consultas SQL solicitadas se encuentran en la carpeta `sql`.

## API

### Introducción

La API está diseñada como un conjunto de microservicios que se comunican entre sí para proporcionar funcionalidades específicas. Cada microservicio está organizado como una carpeta en la carpeta `api`. En el archivo `docker-compose.yml` se indica la configuración de los microservicios según cada Dockerfile. Este archivo instalará todas las dependencias de cada microservicio y los pondrá en funcionamiento.

### Prerrequisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### Cómo utilizar

1. Crear un archivo .env en la carpeta `database` con las variables de entorno correspondientes:

```bash
## Crear archivo .env
cd api/database
touch .env

## Agregar variables de entorno
DATABASE_URL= # URL de la base de datos
```

2. Para iniciar los servicios, debes estar en la carpeta `api` y ejecutar el siguiente comando:

```bash
## Cambiar de carpeta
cd api

## Iniciar los servicios
docker-compose up
```

Una vez que hayas iniciado los servicios utilizando Docker Compose, podrás acceder al servicio de enrutamiento, o _gateway_ utilizando `http://localhost:3000`, éste actúa como un proxy que se comunica con los servicios de autenticación (`/auth`) y los de artículos (`/articles`). Desde _gateway_ podrás acceder a las diferentes rutas especificadas en los servicios para realizar peticiones a la API.

## Descripción de la API

### Rutas disponibles

### Autenticación (`/auth`)

- `POST /register`: Crea un nuevo usuario. Espera recibir por body las credenciales de registro.

```json
// POST /register
// http://localhost:3000/auth/register

{
  "email": "mail@example.com",
  "password": "password"
}
```

La respuesta se devolverá en formato JSON, debería verse así si la operación es exitosa:

```json
{
  "data": {
    "id": "f8dfb62d-93fd-4bf0-aeca-b815bc3f134b",
    "email": "mail@example.com",
    "password": "$2b$10$cAbt3NmSdgFdghudgLHxbO7FgJ39Lj.gV9yEPMwyQuhHjrBhKkH6m"
  }
}
```

Si la operación fallara, se devolverá un objeto `data` con un campo `error` y `message` que contenga la razón de la falla.

Por ejemplo, si se intentara registrar un usuario que ya exista, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "User already exists"
  }
}
```

O bien, si los datos no fueran correctos, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "data": {
      "error": true,
      "message": [
        "email should not be empty",
        "email must be an email",
        "password should not be empty",
        "password must be a string"
      ]
    }
  }
}
```

- `POST /login`: Inicia sesión de un usuario. Espera recibir por body las credenciales de inicio de sesión.

```json
// POST /login
// http://localhost:3000/auth/login

{
  "email": "mail@example.com",
  "password": "password"
}
```

La respuesta se devolverá en formato JSON, debería verse así si la operación es exitosa:

```json
{
  "data": {
    "user": {
      "id": "f8dfb62d-93fd-4bf0-aeca-b815bc3f134b",
      "email": "mail@example.com",
      "password": "$2b$10$cAbt3NmSdgFdghudgLHxbO7FgJ39Lj.gV9yEPMwyQuhHjrBhKkH6m",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmOGRmYjYyZC05M2ZkLTRiZjAtYWVjYS1iODE1YmMzZjEzNGIiLCJpYXQiOjE3MTQ4NTI2NDksImV4cCI6MTcxNTQ1NzQ0OX0.0M-5LZ19Ieo9y7pj9qthe2Flzd9ven3QQVO3k7FqBl4"
    }
  }
}
```

> [!IMPORTANT]
> Este token, es el que deberá utilizarse posteriormente para poder realizar algunas operaciones en el servicio de artículos (`/articles`).

Si la operación fallara, se devolverá un objeto `data` con un campo `error` y `message` que contenga la razón de la falla.

Por ejemplo, si se intentara iniciar sesión de un usuario que no exista o si la contraseña es incorrecta, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Invalid credentials"
  }
}
```

Si los datos no fueran correctos, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "data": {
      "error": true,
      "message": [
        "email should not be empty",
        "email must be an email",
        "password should not be empty",
        "password must be a string"
      ]
    }
  }
}
```

### Artículos (`/articles`)

- `GET /`: Obtiene todos los artículos.

Para obtener todos los artículos, se debe realizar una petición GET a la ruta `/articles`. Esta solicitud permite incluir parámetros de consulta opcionales, como `page` y `limit` para controlar la paginación de resultados (por defecto, `page` es `1` y `limit` es `10`), `name` para filtrar por coincidencia de nombre, `active` para filtrar por estado de activación, o `name` y `active` para filtrar una búsqueda exacta por nombre y estado.

Las solicitudes de tipo `GET` no requieren autenticación mediante token.

```json
// GET /articles
// http://localhost:3000/articles

// GET /articles?page=2&limit=3
{
  "data": {
    "articles": [
      {
        "id": "3546cf7d-5c42-416c-9993-a516a844c443",
        "name": "Dress",
        "brand": "Zara",
        "active": false,
        "updatedAt": "2024-05-03T22:37:57.819Z"
      },
      {
        "id": "3ae82f28-29cf-46e6-90c9-e78ac10f5dc7",
        "name": "Hoodie",
        "brand": "Puma",
        "active": true,
        "updatedAt": "2024-05-03T22:37:57.819Z"
      },
      {
        "id": "3e8efe8d-f9a9-4478-82d2-99d637348ceb",
        "name": "Leggings",
        "brand": "Lululemon",
        "active": true,
        "updatedAt": "2024-05-03T22:37:57.819Z"
      }
    ],
    "total": 24,
    "page": 2,
    "totalPages": 8
  }
}

// GET /articles?name=Hoo
{
  "data": {
    "articles": [
      {
        "id": "3ae82f28-29cf-46e6-90c9-e78ac10f5dc7",
        "name": "Hoodie",
        "brand": "Puma",
        "active": true,
        "updatedAt": "2024-05-03T22:37:57.819Z"
      }
    ],
    "total": 1,
    "page": 1,
    "totalPages": 1
  }
}

// GET /articles?active=false
{
  "data": {
    "articles": [
      {
        "id": "3546cf7d-5c42-416c-9993-a516a844c443",
        "name": "Dress",
        "brand": "Zara",
        "active": false,
        "updatedAt": "2024-05-03T22:37:57.819Z"
      },
      {
        "id": "f0d4cc17-9e1a-482e-ad0b-8c98770cbbf0",
        "name": "Shoes",
        "brand": "Nike",
        "active": false,
        "updatedAt": "2024-05-04T15:32:49.238Z"
      }
    ],
    "total": 2,
    "page": 1,
    "totalPages": 1
  }
}

// GET /articles?name=Socks&active=false
{
  "data": {
    "articles": [
      {
        "id": "16c86050-98ab-4a10-8b32-9ad876bc71cb",
        "name": "Socks",
        "brand": "Tommy Hilfiger",
        "active": true,
        "updatedAt": "2024-05-03T22:37:57.819Z"
      },
      {
        "id": "78b5344c-c5c1-43b0-943e-53646f86ee4c",
        "name": "Socks",
        "brand": "Nike",
        "active": true,
        "updatedAt": "2024-05-04T15:09:39.029Z"
      }
    ],
    "total": 2,
    "page": 1,
    "totalPages": 1
  }
}
```

- `GET /articles/:id`: Obteniene un artículo específico por su ID.

Para obtener un artículo específico, realiza una solicitud de tipo `GET` a la ruta `/articles/:id`, donde `:id` es el identificador único del artículo.

```json
// GET /articles/:id
// http://localhost:3000/articles/2330732d-c153-4cb4-8f14-85bab2f719e4

{
  "data": {
    "id": "2330732d-c153-4cb4-8f14-85bab2f719e4",
    "name": "Jeans",
    "brand": "Levi's",
    "active": true,
    "updatedAt": "2024-05-03T22:37:57.819Z"
  }
}
```

Si la operación fallara, la respuesta se devolverá en formato JSON, debería verse así:

```json
{
  "data": {
    "error": true,
    "message": "Article not found"
  }
}
```

- `POST /articles`: Crea un nuevo artículo. Espera recibir por body la información del nuevo artículo.

Para crear un nuevo artículo, realiza una solicitud de tipo `POST` a la ruta `/articles`, donde se espera recibir por body la información del nuevo artículo. Además, se requiere autenticación mediante token en el encabezado de la solicitud (`Authorization: Bearer <token>`).

```json
// POST /articles
// http://localhost:3000/articles
// Authorization: Bearer <token>

{
  "name": "Shirt",
  "brand": "Tommy Hilfiger"
}
```

Si la operación es exitosa, la respuesta se devolverá en formato JSON, debería verse así:

```json
{
  "data": {
    "id": "595befa1-21da-4e75-943c-c396abf8f392",
    "name": "Shirt",
    "brand": "Tommy Hilfiger",
    "active": true,
    "updatedAt": "2024-05-04T20:24:07.601Z"
  }
}
```

Si la operación fallara, se devolverá un objeto `data` con un campo `error` y `message` que contenga la razón de la falla.

Por ejemplo, si no se proporciona un token de autenticación en headers, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Token not provided"
  }
}
```

O si se proporciona un token de autenticación incorrecto, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Invalid token"
  }
}
```

O bien, si los campos `name` y `brand` no son proporcionados, o si los campos están vacíos, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Name and brand are required"
  }
}
```

- `PUT /articles/:id`: Actualiza un artículo existente. Espera recibir por body la información a actualizar y por params el identificador único del artículo.

Para actualizar un artículo, realiza una solicitud de tipo `PUT` a la ruta `/articles/:id`, donde `:id` es el identificador específico del artículo, y se espera recibir por body la información a actualizar. Además, se requiere autenticación mediante token en el encabezado de la solicitud (`Authorization: Bearer <token>`).

```json
// PUT /articles/:id
// http://localhost:3000/articles/2330732d-c153-4cb4-8f14-85bab2f719e4
// Authorization: Bearer <token>

{
  "name": "Shoes",
  "brand": "Levi's",
  "active": false
}
```

Si la operación es exitosa, la respuesta se devolverá en formato JSON, debería verse así:

```json
{
  "data": {
    "id": "2330732d-c153-4cb4-8f14-85bab2f719e4",
    "name": "Shoes",
    "brand": "Levi's",
    "active": false,
    "updatedAt": "2024-05-04T21:17:42.739Z"
  }
}
```

Si la operación fallara, se devolverá un objeto `data` con un campo `error` y `message` que contenga la razón de la falla.

Por ejemplo, si no se proporciona un token de autenticación en headers, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Token not provided"
  }
}
```

O si se proporciona un token de autenticación incorrecto, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Invalid token"
  }
}
```

O si el identificador del producto no existe, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Article not found"
  }
}
```

Si alguno de los campos no es correcto, el servidor devolverá lo siguiente:

```json
// name or brand too short
{
  "data": {
    "error": true,
    "message": [
      "name must be longer than or equal to 3 characters",
      "brand must be longer than or equal to 3 characters"
    ]
  }
}

// invalid input type for fields
{
  "data": {
    "error": true,
    "message": [
      "active must be a boolean value"
    ]
  }
}
```

- `DELETE /articles/:id`: Desactiva el artículo. Espera recibir por params el identificador específico del producto.

Para desactivar un producto, realiza una solicitud de tipo `DELETE` a la ruta `/articles/:id`, donde `:id` es el identificador único del producto. Además, se requiere autenticación mediante token en el encabezado de la solicitud (`Authorization: Bearer <token>`).

```json
// DELETE /articles/:id
// http://localhost:3000/articles/16c86050-98ab-4a10-8b32-9ad876bc71cb
```

Si la operación es exitosa, se devolverá un estado 204 (no content). El artículo pasará a tener la propiedad `active` en `false`.

Si la operación falla, se devolverá un objeto `data` con un campo `error` y `message` que contenga la razón de la falla.

Por ejemplo, si no se proporciona un token de autenticación en headers, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Token not provided"
  }
}
```

O si se proporciona un token de autenticación incorrecto, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Invalid token"
  }
}
```

O si el identificador del producto no existe, el servidor devolverá lo siguiente:

```json
{
  "data": {
    "error": true,
    "message": "Article not found"
  }
}
```
