const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require('chalk');
const app = express();

const db = require("./app/models");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const Roles = db.roles;
const Sistemas = db.sistemas;
const Sendmails = db.sendmails;
// const tipos_tienda = db.tipos_tienda;
// const formas_de_pago = db.formas_de_pago;

var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//servir archivos estaticos
app.use("/img/", express.static('./uploads/'))
//establecemos las rutas 
require('./app/routes/auth.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/public.routes')(app);
require('./app/routes/inicio.routes')(app);
require('./app/routes/user.routes')(app);
//require('./app/routes/mensajes.routes')(app);
// ruta de inicio
console.log(chalk.red("Inicializando sistema de BackEnd 'Papilio'"))
app.get("/", (req, res) => {
  res.json({ message: "No se supone que debas estar aquí" });
});
//sync({force:true}) permite dropear la base de datos entera, sin eso sincroniza la base con el sistema
db.sequelize.sync().then(() => {
  console.log(chalk.red('Drop and Resync Db'));

  //initial(); //permite crear filas en la tabla seleccionada
});

function initial() {
  Roles.create({
    id_rol: 1,
    nombre: "Admin"
  });

  Roles.create({
    id_rol: 2,
    nombre: "Usuario"
  });

  Roles.create({
    id_rol: 3,
    nombre: "Invitado"
  });

  Sistemas.create({
    nombre_empresa: "Papilio",
    nombres_propietario: "default",
    apellidos_propietario: "default",
    telefono1: "0000000000",
    correo1: "algo@algomas.com",
    direccion: "default",
    descripcion: "default",
  }).catch(function (err) {
    console.log(err);
  })

  Sendmails.create({
    host: "sendmail@papilio.com",
    port: "26",
    user: "sendmail@papilio.com",
    pass: "password",
    mensaje_registro: "<h3>Bienvenido a Papilio</h3>",
    mensaje_general: "<h3>Mensaje general</h3>",
  }).catch(function (err) {
    console.log(err);
  })

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


}

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});