const db = require("../models");
const config = require("../config/auth.config");
const Usuarios = db.usuarios;
const Roles = db.roles;

const crypto = require('crypto')

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  //res.send({ success: "El usuario ha sido agregado exitosamente" });  
  //validar si los campos ingresados son corectos, de lo contrario, emitir un error

  // Save Usuarios to Database
  Usuarios.create({
    nombre_usuario: req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      console.log("consultando user" + user)
      //definir el rol del usuario
      //let roles="{"}"
      user.setRoles("2").then(() => {
        res.send({ success: "El usuario ha sido agregado exitosamente" });
      });
    })
    .catch(err => {
      res.status(200).send({ error: err.message });
    });
};

exports.signin = (req, res) => {
  console.log(req.body)
  Usuarios.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ error: "El usuario no existe" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          error: "Contraseña invalida"
        });
      }



      user.getRoles().then(roles => {
        var token = jwt.sign({
          id: user.id_usuario,
          username: user.username,
          email: user.email,
          roles: roles[0].id_rol
        },
        config.secret, {
          expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
          success: {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: roles[0].id_rol,
            accessToken: token
          }
        });
      });
    })
    .catch(err => {
      res.status(200).send({ error: err.message });
    });
};