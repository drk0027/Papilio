const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.usuarios;

verifyToken = (req, res, next) => {
  //console.log(req.headers)
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log("valor decodificado")
    console.log(decoded)
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === "Admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
// esta es la unica funcion de validacion de usuario que esta trabajando actualmente, ten en cuenta eso
isUser = (req, res, next) => {
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    id_usuario = decoded.id;
  });
  //console.log(id_usuario)
  Usuario.findByPk(id_usuario).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        //console.log(roles[i].dataValues.nombre)
        if (roles[i].dataValues.nombre === "Usuario") {
          console.log("La consulta ha sido realizada por un usuario")
          next();
          return;
        }
      }

      res.status(403).send({
        message: "requiere rol de usuario"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  Usuario.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;