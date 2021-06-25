# Tabla de contenidos
- [Tabla de contenidos](#tabla-de-contenidos)
- [Sistema de gestion para empresas funerarias "Papilio"](#sistema-de-gestion-para-empresas-funerarias-papilio)
- [Configuracion del Backend](#configuracion-del-backend)
  - [Configuracion de la base de datos](#configuracion-de-la-base-de-datos)
  - [Configuracion de seguridad de la API](#configuracion-de-seguridad-de-la-api)
  - [Configuracion inicial servidor de API](#configuracion-inicial-servidor-de-api)
  - [Configuracion de informacion del frontEnd para la API](#configuracion-de-informacion-del-frontend-para-la-api)
  - [Configuracion de cuenta de administrador](#configuracion-de-cuenta-de-administrador)
- [Configuracion de Frontend](#configuracion-de-frontend)
- [Puesta en marcha](#puesta-en-marcha)
  - [Backend](#backend)
  - [Frontend](#frontend)
    - [depuracion](#depuracion)
    - [produccion](#produccion)


# Sistema de gestion para empresas funerarias "Papilio"

Trabajo de fin de estudios para la Universidad de la Rioja, modalidad On-Line

# Configuracion del Backend

## Configuracion de la base de datos
En el directorio _API-papilio/app/config/_ se deben agregar las configuraciones de la base de datos

    module.exports = {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "root",
        DB: "papilio",
        dialect: "mysql",
        pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
    };

## Configuracion de seguridad de la API

En el directorio _API-papilio/app/config/_ se deben cambiar el secreto para mejorar la seguridad de JWT

    module.exports = {
        secret: "PAPILIO-0.01"
    };

## Configuracion inicial servidor de API

En el archivo index.js del directorio API-papilio:


    db.sequelize.sync().then(() => {
        console.log(chalk.red('Drop and Resync Db'));
        //initial(); //permite crear filas en la tabla seleccionada
    });

debe cambiarse a:

    db.sequelize.sync({force:true}).then(() => {
        console.log(chalk.red('Drop and Resync Db'));
        initial(); //permite crear filas en la tabla seleccionada
    });

Para la primera ejecucion, una vez creados los detalles iniciales se regresa a los valores iniciales y se vuelve a ejecutar el servidor. Una vez hecho esto, se puede dejar ejecutando con nodemon o pm2.

## Configuracion de informacion del frontEnd para la API

Estas configuraciones se utilizan para informar al usuario en el mensaje de correo electronico, que el perfil ha sido creado y puede visitarlo en ese directorio.

En el archivo _admin.controller.js_ en el directorio _API-papilio/app/controller/_ en las lineas 21-23 actualizar segun sus propias configuraciones del servidor

    var base_url = "localhost"
    var frontend_url = "localhost:3000"
    var backend_url = "localhost:8081"

En la linea 617 se puede cambiar el mensaje informativo que recibirá el usuario en formato html, tambien el asunto.

    var message = {
            from: resp1.dataValues.user, // Sender address
            to: resp2.dataValues.email,         // List of recipients
            subject: "Nueva memoria creada", // Subject line
            html: "<h3>Saludos</h3><p>Se ha creado una nueva memoria en el siguiente <a href='http://" + frontend_url + "/Memorial/" + crear.slug + "'>enlace</a></p>" // HTML body
        };

## Configuracion de cuenta de administrador

En el directorio _API-papilio/_ modificar el archivo index.js en la linea 88

    Usuarios.create({
        nombre_usuario: papilio,
        username: papilio,
        email: papilio,
        password: bcrypt.hashSync("admin", 8)
    }).then(user => {
        user.setRoles("1").then(() => {
        });
    }).catch(err => {
        res.status(200).send({ error: err.message });
    });

# Configuracion de Frontend

En el directorio _papilio/lib/_ el archivo Vars.js debe contener la direccion del backend

    global.server="http://localhost:8081/";
    global.base_url="http://localhost:3000/";

# Puesta en marcha

## Backend
usar nodemon en el directorio API-papilio

## Frontend

### depuracion

usar npm run dev en el directorio papilio en caso de hacer pruebas

### produccion

Primero hay que compilar la pagina con run build y luego ejecutar run start

npm run build
npm run start



