# 🌿 FlorDeNectar

**FlorDeNectar** es un proyecto de comercio electrónico enfocado en productos de cosmética natural y cuidado personal. Su componente actual es una **API REST** que permite gestionar información de productos, clientes, proveedores, inventario, carritos, pedidos y otros recursos del negocio.

La aplicación está desarrollada con **Node.js + Express**, se conecta a **MongoDB mediante Mongoose** y se ejecuta utilizando **Docker Compose**. Incluye **11 modelos**, **11 colecciones** y **44 rutas CRUD** (crear, consultar, actualizar y eliminar).

> **Alcance actual:** este repositorio contiene el backend y una base de datos de ejemplo. No incluye una tienda web terminada, autenticación funcional ni una pasarela real de pagos.

## Contenido

1. [Tecnologías](#tecnologías)
2. [Arquitectura y funcionamiento](#arquitectura-y-funcionamiento)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Base de datos](#base-de-datos)
5. [Requisitos previos](#requisitos-previos)
6. [Instalación y ejecución](#instalación-y-ejecución)
7. [Cargar las 11 colecciones desde el TXT](#cargar-las-11-colecciones-desde-el-txt)
8. [Conectarse con MongoDB Compass](#conectarse-con-mongodb-compass)
9. [Endpoints de la API](#endpoints-de-la-api)
10. [Ejemplos de Postman](#ejemplos-de-postman)
11. [Comandos útiles](#comandos-útiles)
12. [Resolución de problemas](#resolución-de-problemas)
13. [Consideraciones y mejoras pendientes](#consideraciones-y-mejoras-pendientes)

## Tecnologías

| Tecnología | Uso en FlorDeNectar |
| --- | --- |
| Node.js 22 | Ejecuta el servidor JavaScript. |
| Express 5 | Define las rutas HTTP de la API REST. |
| Mongoose 9 | Conecta Node.js con MongoDB y define los modelos. |
| MongoDB | Almacena los documentos de las 11 colecciones. |
| Docker | Ejecuta la aplicación y MongoDB en contenedores separados. |
| Docker Compose | Configura y levanta ambos servicios. |
| Postman | Permite probar GET, POST, PUT y DELETE. |
| MongoDB Compass / Mongosh | Permiten consultar directamente la base de datos. |
| Git / GitHub | Control de versiones y colaboración. |

Las versiones de Express, Mongoose y otras dependencias se encuentran declaradas en `package.json` y `package-lock.json`.

## Arquitectura y funcionamiento

```text
                  Postman / Cliente HTTP
                           |
                           | http://localhost:5000
                           v
                 +--------------------+
                 | flordenectar_app   |
                 | Node.js + Express  |
                 | Puerto interno 3000|
                 +--------------------+
                           |
                           | Mongoose
                           | mongodb://database:27017/flordenectar
                           v
                 +--------------------+
                 | flordenectar_db    |
                 | MongoDB            |
                 | Puerto interno 27017|
                 +--------------------+
                           |
                           v
                     11 colecciones
```

1. El cliente (por ejemplo, Postman) hace una petición HTTP a `localhost:5000`.
2. Express recibe la petición en `src/index.js` y la dirige a `src/routes/index.routes.js`.
3. La ruta usa el modelo correspondiente de `src/models/`.
4. Mongoose se comunica con MongoDB utilizando el nombre de servicio `database` de Docker Compose.
5. MongoDB devuelve el resultado, que la API responde en formato JSON (o texto para la ruta principal).

**Importante:** `database` es un nombre de servicio dentro de la red de Docker, **no** `localhost` del contenedor Node.js. Por eso, `src/database.js` utiliza:

```javascript
mongoose.connect("mongodb://database:27017/flordenectar");
```

## Estructura del proyecto

```text
FlorDeNectar/
├── database/
│   └── flordenectar.seed.js       # Script basado en el TXT de MongoDB
├── src/
│   ├── models/
│   │   ├── carritos.js
│   │   ├── categorias.js
│   │   ├── cupones.js
│   │   ├── envios.js
│   │   ├── lista_deseos.js
│   │   ├── lotes_inventario.js
│   │   ├── pedidos.js
│   │   ├── productos.js
│   │   ├── proveedores.js
│   │   ├── resenas.js
│   │   └── usuarios.js
│   ├── routes/
│   │   └── index.routes.js        # Rutas de los 11 recursos
│   ├── database.js                # Conexión Mongoose -> MongoDB
│   └── index.js                   # Inicialización de Express
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

**Qué hace cada archivo principal:**

- `Dockerfile`: construye la imagen de la aplicación con Node.js 22, instala dependencias y ejecuta `npm start`.
- `docker-compose.yml`: define los servicios `webapp` y `database`, sus contenedores y sus puertos.
- `src/index.js`: habilita la lectura de JSON, incorpora la conexión y registra las rutas.
- `src/database.js`: establece la conexión de Mongoose a la base `flordenectar`.
- `src/routes/index.routes.js`: implementa las 44 rutas CRUD.
- `src/models/*.js`: define los tipos de datos de cada colección.
- `database/flordenectar.seed.js`: contiene los `insertMany()` tomados del TXT original para cargar los registros iniciales.

## Base de datos

La base se llama **`flordenectar`**. El TXT inicial incluye **11 colecciones y 40 documentos**:

| Colección | Documentos iniciales | Para qué sirve |
| --- | ---: | --- |
| `categorias` | 4 | Categorías de cosmética facial, corporal, aromaterapia y jabonería. |
| `proveedores` | 3 | Datos de proveedores de insumos/productos. |
| `cupones` | 3 | Códigos promocionales y sus condiciones. |
| `usuarios` | 4 | Datos de administradores y clientes, incluidas sus direcciones. |
| `productos` | 5 | Catálogo, precios, stock, SKU e ingredientes. |
| `lotes_inventario` | 5 | Lotes, cantidades y fechas de producción/vencimiento. |
| `carritos` | 3 | Productos y cantidades guardadas por cliente. |
| `pedidos` | 3 | Compras, detalle de productos e información de pago. |
| `resenas` | 4 | Comentarios y calificaciones de productos. |
| `envios` | 3 | Datos de mensajería, seguimiento y entrega. |
| `lista_deseos` | 3 | Productos guardados para futuras compras. |
| **Total** | **40** | **Datos iniciales del script.** |

### Cómo se relacionan los datos

La base es NoSQL; los siguientes son **vínculos lógicos mediante campos**, no claves foráneas obligatorias:

- `productos.id_categoria` → `categorias._id` (por ejemplo, `facial`).
- `lotes_inventario.sku_producto` → `productos.sku`.
- `lotes_inventario.ruc_proveedor` → `proveedores.ruc`.
- `carritos.correo_usuario`, `pedidos.correo_usuario`, `resenas.correo_usuario` y `lista_deseos.correo_usuario` → `usuarios.correo`.
- Los SKU de `carritos.items`, `pedidos.detalles`, `resenas` y `lista_deseos.productos_guardados` identifican productos.
- `pedidos.codigo_cupon` → `cupones.codigo`, cuando hay cupón.
- `pedidos.id_direccion` identifica una dirección guardada en el usuario correspondiente.
- `envios.transaccion_ref_pedido` coincide con `pedidos.pago.transaccion_ref` en los registros de ejemplo.

Los arreglos y objetos anidados son parte del diseño: `carritos.items`, `pedidos.detalles`, `pedidos.pago`, `usuarios.direcciones` y `lista_deseos.productos_guardados`.

> En `categorias`, el `_id` es un **texto** como `facial` o `corporal`. En las demás colecciones, MongoDB genera normalmente identificadores `ObjectId` para los documentos nuevos.

### Ejemplo de documento de carrito

```json
{
  "correo_usuario": "prueba@flordenectar.pe",
  "items": [
    { "sku_producto": "FDN-FAC-001", "cantidad": 2 },
    { "sku_producto": "FDN-JAB-001", "cantidad": 1 }
  ]
}
```

### Sobre los datos del TXT

- El archivo es un **script de inicialización**, no un respaldo automático de la base actual.
- Carga los documentos escritos en el TXT original; **no incluye** los cambios hechos posteriormente desde Postman o Compass.
- Los importes, fechas, cupones, reseñas y pagos son datos de ejemplo; la API actual no calcula pagos ni valida automáticamente las reglas comerciales.
- **Antes de subir el script a un repositorio público**, comprueba que los nombres, correos, teléfonos, direcciones y hashes de contraseñas sean ficticios o estén anonimizados. Si no puedes confirmarlo, mantén el repositorio privado y sustituye esos valores por datos inventados.

## Requisitos previos

- **Docker Desktop** instalado y abierto (con el motor de Docker iniciado).
- **Git** para obtener o actualizar el repositorio.
- **Postman** (opcional, para probar la API).
- **MongoDB Compass** (opcional, para visualizar los documentos).

**No es necesario instalar MongoDB ni Node.js directamente en el equipo para ejecutar el proyecto con Docker**, ya que están dentro de los contenedores.

## Instalación y ejecución

### 1. Obtener el código

Descarga el ZIP del repositorio desde GitHub y descomprímelo, **o** utiliza Git:

```powershell
git clone https://github.com/TU_USUARIO/FlorDeNectar.git
cd FlorDeNectar
```

Sustituye `TU_USUARIO` por el usuario real del repositorio. Si descargaste el ZIP, abre una terminal en la carpeta extraída.

### 2. Verificar los puertos

En `docker-compose.yml`, la aplicación expone el puerto `5000:3000`.

Para MongoDB se utilizó inicialmente `27019:27017` y durante las pruebas se cambió a `27020:27017` debido a un conflicto local. **Antes de subir o ejecutar el repositorio, comprueba cuál de los dos está configurado en tu archivo final.** Una configuración válida es:

```yaml
services:
  webapp:
    ports:
      - "5000:3000"
  database:
    ports:
      - "27020:27017"
```

Esto es solo un ejemplo de los apartados de puertos, **no reemplaza el `docker-compose.yml` completo**.

| Servicio | Acceso desde la computadora | Dirección interna de Docker |
| --- | --- | --- |
| API Express | `http://localhost:5000` | `webapp:3000` |
| MongoDB | `mongodb://localhost:27020` si usas `27020:27017` | `database:27017` |

Si tu archivo usa `27019:27017`, la conexión desde Compass será `mongodb://localhost:27019`. El puerto **interno** de MongoDB sigue siendo `27017` en ambos casos.

### 3. Iniciar los servicios

Abre PowerShell o una terminal en la raíz del proyecto y ejecuta:

```powershell
docker compose up -d --build
```

El comando construye la imagen de Node.js, instala las dependencias y levanta los contenedores de la aplicación y MongoDB. No copia una base de datos de otro contenedor.

Verifica que ambos estén funcionando:

```powershell
docker compose ps
```

Los nombres configurados son:

- `flordenectar_app` — API Node.js / Express.
- `flordenectar_db` — MongoDB.

### 4. Comprobar la API

Abre en el navegador o Postman:

```text
http://localhost:5000/
```

Debe responder:

```text
FlorDeNectar App
```

**Importante:** si todavía no has cargado el script de datos, una consulta como `GET /carritos/ls` podría devolver `[]`. Eso significa que esa colección todavía no tiene documentos, no necesariamente que la API esté fallando.

## Cargar las 11 colecciones desde el TXT

El repositorio incluye **`database/flordenectar.seed.js`**, creado directamente a partir del TXT de MongoDB. Conserva las instrucciones `db.<coleccion>.insertMany([...])` y las fechas `ISODate(...)`.

**Estos pasos se ejecutan una sola vez sobre una base nueva o vacía.** No vuelvas a importar el script sobre una base que ya tenga los registros, porque se pueden producir duplicados o errores de `_id`.

### 1. Asegúrate de que MongoDB esté activo

```powershell
docker compose ps
```

### 2. Copia el script al contenedor de MongoDB

Desde la raíz de FlorDeNectar:

```powershell
docker cp ./database/flordenectar.seed.js flordenectar_db:/tmp/flordenectar.seed.js
```

Este comando **solo copia el archivo de instrucciones**, no copia ni clona contenedores.

### 3. Ejecuta el script en la base `flordenectar`

```powershell
docker exec flordenectar_db mongosh flordenectar /tmp/flordenectar.seed.js
```

MongoDB ejecutará los `insertMany()` del archivo. Al terminar, la base contendrá los documentos iniciales especificados en el TXT.

### 4. Verifica las colecciones y cantidades

```powershell
docker exec flordenectar_db mongosh flordenectar --quiet --eval "db.getCollectionNames().sort().forEach(c => print(c + ': ' + db.getCollection(c).countDocuments({})))"
```

En una base vacía importada una sola vez, el resultado esperado es:

```text
carritos: 3
categorias: 4
cupones: 3
envios: 3
lista_deseos: 3
lotes_inventario: 5
pedidos: 3
productos: 5
proveedores: 3
resenas: 4
usuarios: 4
```

**¡Listo!** Otro integrante ya puede acceder a la misma **estructura y datos iniciales** de MongoDB, pero en su propia computadora.

> **Aclaración:** las bases de datos de los integrantes son copias **independientes**. Si alguien hace un POST, PUT o DELETE en su computadora, ese cambio **no aparece automáticamente** en la base de datos de los demás. Para compartir cambios de datos posteriores necesitarán actualizar el script de prueba o usar una base compartida.

## Conectarse con MongoDB Compass

1. Abre MongoDB Compass.
2. Crea una conexión con `mongodb://localhost:27020/` **si tu Compose publica el puerto 27020** (o usa `27019` si ese es el puerto configurado).
3. Abre la base `flordenectar`.
4. Selecciona una de las 11 colecciones, por ejemplo `carritos` o `productos`.
5. Pulsa **Refresh** después de hacer cambios con Postman.

**Atención:** si tienes un MongoDB antiguo conectado en otro puerto, podrías visualizar una base distinta. Verifica que Compass apunta al mismo servicio que la API.

También puedes abrir Mongosh sin instalarlo en Windows:

```powershell
docker exec -it flordenectar_db mongosh flordenectar
```

Ejemplos dentro de Mongosh:

```javascript
show collections
db.productos.find()
db.carritos.find()
db.usuarios.countDocuments({})
```

## Endpoints de la API

**URL base:** `http://localhost:5000`

| Método | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/` | Comprobar el servidor (`FlorDeNectar App`). |
| `POST` | `/{coleccion}` | Crear un documento. |
| `GET` | `/{coleccion}/ls` | Listar todos los documentos. |
| `PUT` | `/{coleccion}/{id}` | Actualizar un documento por `_id`. |
| `DELETE` | `/{coleccion}/{id}` | Eliminar un documento por `_id`. |

Donde `{coleccion}` es uno de estos 11 recursos:

```text
carritos
categorias
cupones
envios
lista_deseos
lotes_inventario
pedidos
productos
proveedores
resenas
usuarios
```

Ejemplos adicionales:

```http
GET    http://localhost:5000/productos/ls
GET    http://localhost:5000/usuarios/ls
GET    http://localhost:5000/lotes_inventario/ls
POST   http://localhost:5000/productos
PUT    http://localhost:5000/productos/ID_DEL_PRODUCTO
DELETE http://localhost:5000/productos/ID_DEL_PRODUCTO
```

**Nota:** `ID_DEL_PRODUCTO` es un marcador; debe sustituirse por el `_id` real de un documento. En `categorias`, ese `_id` puede ser directamente `facial`, `corporal`, etc.

## Ejemplos de Postman

Para `POST` y `PUT`, selecciona **Body → raw → JSON** y verifica que la petición use `Content-Type: application/json`.

### 1. GET — Consultar productos

```http
GET http://localhost:5000/productos/ls
```

Devuelve el catálogo almacenado. Con el TXT inicial debe incluir productos como el sérum `FDN-FAC-001` y el jabón `FDN-JAB-001`.

### 2. POST — Crear un carrito de prueba

```http
POST http://localhost:5000/carritos
Content-Type: application/json
```

```json
{
  "correo_usuario": "prueba@flordenectar.pe",
  "items": [
    { "sku_producto": "FDN-FAC-001", "cantidad": 2 },
    { "sku_producto": "FDN-JAB-001", "cantidad": 1 }
  ]
}
```

MongoDB genera un `_id` para el carrito nuevo. **Guarda ese `_id`** para los pasos siguientes. La implementación actual responde normalmente con código HTTP `200`, aunque en APIs convencionales las creaciones suelen usar `201`.

### 3. GET — Confirmar que se guardó

```http
GET http://localhost:5000/carritos/ls
```

Busca el correo `prueba@flordenectar.pe` y comprueba el contenido de `items`.

### 4. PUT — Actualizar el carrito

```http
PUT http://localhost:5000/carritos/ID_DEL_CARRITO
Content-Type: application/json
```

```json
{
  "correo_usuario": "prueba@flordenectar.pe",
  "items": [
    { "sku_producto": "FDN-FAC-001", "cantidad": 5 },
    { "sku_producto": "FDN-JAB-001", "cantidad": 3 }
  ]
}
```

Sustituye `ID_DEL_CARRITO` por el identificador obtenido en POST.

**Detalle técnico:** las rutas actuales utilizan `findOneAndUpdate()` sin `{ new: true }`. Por eso, la respuesta del PUT puede mostrar los valores **anteriores** a la actualización. Ejecuta de nuevo `GET /carritos/ls` o consulta Compass para verificar que las cantidades cambiaron a `5` y `3`.

### 5. DELETE — Borrar solamente el carrito de prueba

```http
DELETE http://localhost:5000/carritos/ID_DEL_CARRITO
```

No se envía un Body. Si MongoDB eliminó un documento, la respuesta incluirá algo como:

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

Compruébalo de nuevo con `GET /carritos/ls`. **No elimines los registros iniciales si deseas conservar el conjunto de prueba del TXT.**

### ¿Los ejemplos sirven para otras colecciones?

Sí: los cuatro métodos siguen el mismo patrón de rutas. **Lo que cambia es el JSON**, ya que cada modelo tiene atributos específicos definidos en `src/models/`.

Por ejemplo, para crear un producto:

```http
POST http://localhost:5000/productos
Content-Type: application/json
```

```json
{
  "id_categoria": "facial",
  "nombre": "Mascarilla Botánica de Prueba",
  "descripcion": "Producto de demostración",
  "ingredientes_botanicos": "Aloe vera y manzanilla",
  "certificacion_organica": "Demo",
  "precio": 35,
  "stock": 12,
  "sku": "FDN-TEST-001",
  "imagen_url": "https://example.com/producto.jpg",
  "fecha_creacion": "2026-11-23T00:00:00Z"
}
```

## Comandos útiles

Ejecutar desde la carpeta del proyecto:

| Comando | Función |
| --- | --- |
| `docker compose up -d --build` | Construir e iniciar los servicios. |
| `docker compose ps` | Ver los servicios y puertos activos. |
| `docker compose logs --tail=50 webapp` | Ver los registros de Express. |
| `docker compose logs --tail=50 database` | Ver los registros de MongoDB. |
| `docker compose restart webapp` | Reiniciar Node.js. |
| `docker compose stop` | Detener los servicios. |
| `docker compose start` | Volver a iniciarlos. |
| `docker exec -it flordenectar_db mongosh flordenectar` | Abrir la consola de MongoDB. |

Para obtener cambios del repositorio:

```powershell
git pull
```

Si se modificaron las dependencias, el Dockerfile o la configuración, reconstruye con `docker compose up -d --build`.

## Resolución de problemas

### `GET /carritos/ls` devuelve `[]`

El servidor puede estar funcionando, pero la colección está vacía. Ejecuta el script `database/flordenectar.seed.js` **solo si aún no has cargado datos** y vuelve a consultar.

### Error `MongooseError: Operation ... buffering timed out after 10000ms`

La API no consiguió completar operaciones contra MongoDB. Revisa:

```powershell
docker compose ps
docker compose logs --tail=50 database
docker compose logs --tail=50 webapp
```

Confirma que `flordenectar_db` está activo y conectado a la misma red de Compose que `flordenectar_app`. Si MongoDB tardó en arrancar, prueba:

```powershell
docker compose restart webapp
```

### Puerto ocupado al iniciar MongoDB

Si `27019` está ocupado, utiliza un puerto local libre, por ejemplo:

```yaml
ports:
  - "27020:27017"
```

Después inicia nuevamente los servicios y actualiza la conexión de Compass. **No cambies** la cadena interna `mongodb://database:27017/flordenectar` solo por modificar el puerto externo.

### Postman muestra datos, pero Compass no

Probablemente Compass está conectado al puerto de otra instancia de MongoDB. Confirma que utiliza el puerto publicado por el servicio `database` del Compose actual.

### El PUT responde con valores antiguos

La operación `findOneAndUpdate()` devuelve el documento anterior de forma predeterminada. Consulta de nuevo con GET para comprobar el resultado. Si la respuesta es `null`, revisa el `_id` utilizado.

### El DELETE devuelve `deletedCount: 0`

No se eliminó ningún documento. Comprueba que el `_id` exista en esa colección y base de datos.

### El script de datos falla al ejecutarse por segunda vez

No está pensado para ejecutarse repetidamente sobre una base ya poblada. Puede encontrar `_id` duplicados o insertar documentos adicionales. **No borres una base con información importante para volver a importar los datos de ejemplo**. Usa una base limpia para pruebas nuevas.

### Los datos desaparecen tras recrear contenedores

El `docker-compose.yml` revisado **no define un volumen persistente con nombre** para MongoDB. La imagen puede usar un volumen anónimo, pero no conviene depender de él para conservar información al recrear servicios.

El script restaura **solo los datos iniciales**, no los POST/PUT/DELETE realizados después. Para conservar datos posteriores, será necesario configurar una estrategia de persistencia y respaldos. No utilices `docker compose down -v` sin conocer sus consecuencias.

## Consideraciones y mejoras pendientes

- **Proyecto de desarrollo:** la API actual no incorpora autenticación/autorización, validaciones completas, manejo centralizado de errores ni controles para producción.
- **No hay pasarela de pago integrada:** los campos de pago en `pedidos` son registros de ejemplo.
- **Sin integridad referencial automática:** los SKU, correos y RUC conectan colecciones de manera lógica; MongoDB no garantiza por sí solo que esos valores correspondan a registros existentes.
- **Verificación de datos:** los montos de pedidos y descuentos del TXT no son calculados por el backend y deben validarse antes de utilizarlos para reglas comerciales.
- **Datos sensibles:** utiliza cuentas, correos, teléfonos, direcciones y hashes ficticios/anónimos si publicas el repositorio.
- **Cupones:** el campo `activo` no significa necesariamente que el cupón siga vigente; también debe revisarse `fecha_expiracion`.
- **Persistencia:** conviene agregar un volumen Docker con nombre y una estrategia de respaldos antes de almacenar datos importantes. Incorporar un volumen nuevo a una base ya existente requiere migrar los datos con cuidado.
- **Pruebas:** se han comprobado GET, POST y PUT sobre `carritos`; las demás rutas requieren pruebas funcionales individuales. La existencia de 44 rutas no implica que todas hayan sido verificadas.
- **Mejoras futuras:** validaciones de esquemas, respuestas HTTP más específicas, autenticación, pruebas automatizadas, variables de entorno y documentación OpenAPI/Swagger.

## Licencia

`package.json` declara la licencia **ISC**. Si se desea publicar el proyecto formalmente con esa licencia, conviene añadir el archivo `LICENSE` correspondiente.

---

**FlorDeNectar** — API REST para la gestión de un e-commerce de cosmética natural.
