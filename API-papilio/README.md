# Sistema REST básico con soporte con autenticacion jwt y base mysql con sequelize

Este sistema tiene un flujo basado en modelo vista controlador, incluyendo un middleware que se asegura de validar que el usuario este autentificado y pertenezca a algun rol

**Forma de ejecucion**

    nodemon index.js

**Flujo de trabajo**

- **index.js** punto de entrada al sistema
    - **route** segun la ruta solicitada por el usuario, se crean las rutas segun el formato xxx.routes.ks
        - **middleware** se solicita confirmacion de autentificacion y roles
        - **controller** se crean las funciones que responderan al usuario y las vistas (aqui estan combinada vista y controlador)
            - **model** Se administran los modelos de la base de datos

<h2>Descripcion de las rutas</h2>

**"/"** ruta de inicio
- **metodo:** GET
- **respuesta**: mensaje de error


**Descripcion:** esta es la ruta principal. No tiene validacion de ningun tipo y responde por GET.

<hr>
<h3>Mensajes</h3>

**/mensajes/ultimos/:cantidad**
- **metodo:** GET
- **respuesta**: lista de ultimos mensajes segun **:cantidad**

**Descripcion:** esta ruta permite a los usuarios registrados mostrar la lista con los ultimos x mensajes