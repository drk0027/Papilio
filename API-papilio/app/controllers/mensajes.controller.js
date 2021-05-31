const db = require("../models");
const mensajes = db.mensajes;
const usuarios = db.usuarios;
const canales = db.canales;
const Op = db.Sequelize.Op;


exports.ultimos = (req, res) => {
  //si es por get, no se usan parametros  
  //const id = req.params.id;
  console.log(req.params.cantidad);

    mensajes.findAll({
      attributes:[
        "contenido",
        "fecha_creacion",
        "cantidad_palabras"
      ],
      limit: 2,
      order:[
        ['fecha_creacion','DESC']
      ],
      include: [
        {
          model:usuarios,
        },
        {
          model:canales,
          as:"canales"
        }
      ]
    })
    .then(
      data => {
        res.send(data);
      }
    )
  };
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};